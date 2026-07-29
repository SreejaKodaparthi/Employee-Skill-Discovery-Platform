const Skill = require("../models/Skill");
const EmployeeProfile = require("../models/EmployeeProfile");
const User = require("../models/User");
const Certification = require("../models/Certification");
const calculateTrustScore = require("../utils/trustScore");

const {
  PROFICIENCY_SCORES,
  escapeRegex,
  parseSkills,
  calculateSkillScore,
} = require("../utils/searchUtils");

// Simple numeric weight used only by the legacy searchEmployees() endpoint below.
// NOTE: advancedEmployeeSearch() uses calculateSkillScore() from searchUtils instead,
// so this map is NOT shared between the two endpoints — keep that in mind if you
// ever try to unify their scoring logic.
const levelScore = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
  expert: 4,
};

/**
 * GET /api/search/employees
 * Legacy / simple employee search by a single skill.
 * Kept for backward compatibility — prefer advancedEmployeeSearch for new features.
 */
const searchEmployees = async (req, res) => {
  try {
    const { skill, minYears, proficiencyLevel } = req.query;

    const filter = {};

    // Case-insensitive partial match on skill name
    if (skill) {
      filter.skillName = {
        $regex: skill,
        $options: "i",
      };
    }

    if (minYears) {
      filter.yearsOfExperience = {
        $gte: Number(minYears),
      };
    }

    if (proficiencyLevel) {
      filter.proficiencyLevel = proficiencyLevel;
    }

    // Pull all skill documents matching the filter, along with basic user info
    const skills = await Skill.find(filter).populate(
      "userId",
      "name email role"
    );

    // Group skills by userId so each employee appears once with all their
    // matching skills nested underneath, instead of one row per skill.
    const userSkillsMap = {};
    skills.forEach((skill) => {
      const userId = skill.userId._id.toString();

      if (!userSkillsMap[userId]) {
        userSkillsMap[userId] = {
          user: skill.userId,
          skills: [],
          totalScore: 0,
        };
      }

      // Basic weighted score per skill: proficiency + experience + endorsements,
      // with a bonus depending on where the skill data came from (resume vs.
      // peer-endorsed tends to be considered more trustworthy).
      let score = 0;
      score += levelScore[skill.proficiencyLevel] || 0;
      score += skill.yearsOfExperience || 0;
      score += skill.endorsementCount || 0;
      if (skill.source === "resume") score += 2;
      if (skill.source === "endorsed") score += 3;

      userSkillsMap[userId].skills.push({
        skillName: skill.skillName,
        category: skill.category,
        proficiencyLevel: skill.proficiencyLevel,
        yearsOfExperience: skill.yearsOfExperience,
        source: skill.source,
        endorsementCount: skill.endorsementCount,
        _id: skill._id,
      });

      userSkillsMap[userId].totalScore += score;
    });

    // Fetch employee profile info (department, designation, etc.) for everyone
    // who matched at least one skill
    const userIds = Object.keys(userSkillsMap);
    const profiles = await EmployeeProfile.find({
      userId: { $in: userIds },
    });

    const profileMap = {};
    profiles.forEach((profile) => {
      profileMap[profile.userId.toString()] = profile;
    });

    // Build final result list — one entry per employee, matchScore is the
    // *average* skill score across all of their matched skills (not a sum),
    // so employees with many low-value skills aren't unfairly boosted purely
    // by skill count.
    const results = Object.values(userSkillsMap).map((item) => ({
      employee: item.user,
      profile: profileMap[item.user._id.toString()] || null,
      skills: item.skills,
      matchScore:
        Math.round((item.totalScore / item.skills.length) * 10) / 10,
    }));

    results.sort((a, b) => b.matchScore - a.matchScore);

    res.status(200).json({
      count: results.length,
      results,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * GET /api/search/employees/advanced
 * Multi-filter employee search: skills, department, designation, location,
 * education, certification, experience range, and minimum proficiency —
 * with pagination and a composite ranking score.
 */
const advancedEmployeeSearch = async (req, res) => {
  try {
    const {
      skills,
      matchMode = "any",
      department,
      designation,
      location,
      education,
      certification,
      minExperience,
      maxExperience,
      minProficiency,
      page = 1,
      limit = 10,
    } = req.query;

    // Normalize the comma/array "skills" query param into a clean string array
    const requestedSkills = parseSkills(skills);

    // "all" = employee must have every requested skill; anything else defaults to "any"
    const normalizedMatchMode =
      String(matchMode).toLowerCase() === "all" ? "all" : "any";

    // Pagination guards: page >= 1, limit clamped between 1 and 50
    const pageNumber = Math.max(Number(page) || 1, 1);
    const pageLimit = Math.min(Math.max(Number(limit) || 10, 1), 50);

    const minimumExperience =
      minExperience !== undefined ? Number(minExperience) : 0;

    const maximumExperience =
      maxExperience !== undefined
        ? Number(maxExperience)
        : Number.MAX_SAFE_INTEGER;

    if (Number.isNaN(minimumExperience) || minimumExperience < 0) {
      return res.status(400).json({
        success: false,
        message: "Minimum experience must be a valid non-negative number",
      });
    }

    if (
      Number.isNaN(maximumExperience) ||
      maximumExperience < minimumExperience
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Maximum experience must be greater than or equal to minimum experience",
      });
    }

    const normalizedProficiency = minProficiency?.toLowerCase();

    if (normalizedProficiency && !PROFICIENCY_SCORES[normalizedProficiency]) {
      return res.status(400).json({
        success: false,
        message:
          "Proficiency must be beginner, intermediate, advanced or expert",
      });
    }

    const minimumProficiencyScore =
      PROFICIENCY_SCORES[normalizedProficiency] || 0;

    // Require at least one meaningful filter so we don't accidentally return
    // the entire employee database on an empty query
    const hasAtLeastOneFilter =
      requestedSkills.length > 0 ||
      department ||
      designation ||
      location ||
      education ||
      certification ||
      minExperience !== undefined ||
      maxExperience !== undefined ||
      minProficiency;

    if (!hasAtLeastOneFilter) {
      return res.status(400).json({
        success: false,
        message: "Provide at least one search filter",
      });
    }

    /* ------------------------------------------------------------------ *
     * 1. PROFILE FILTERING
     * Narrow candidates down by department / designation / location /
     * education. Builds `allowedUserIds`, which subsequent steps
     * intersect against. `null` means "no profile filter applied yet".
     * ------------------------------------------------------------------ */
    const profileQuery = {};

    // Department uses an exact (anchored) case-insensitive match
    if (department) {
      profileQuery.department = new RegExp(
        `^${escapeRegex(department.trim())}$`,
        "i"
      );
    }

    // Designation, location, education use partial case-insensitive match
    if (designation) {
      profileQuery.designation = new RegExp(
        escapeRegex(designation.trim()),
        "i"
      );
    }

    if (location) {
      profileQuery.location = new RegExp(escapeRegex(location.trim()), "i");
    }

    if (education) {
      profileQuery.education = new RegExp(escapeRegex(education.trim()), "i");
    }

    let allowedUserIds = null;

    if (Object.keys(profileQuery).length > 0) {
      const matchingProfiles = await EmployeeProfile.find(profileQuery)
        .select("userId")
        .lean();

      allowedUserIds = new Set(
        matchingProfiles.map((profile) => profile.userId.toString())
      );

      // Short-circuit early if the profile filters eliminate everyone
      if (allowedUserIds.size === 0) {
        return res.status(200).json({
          success: true,
          count: 0,
          totalResults: 0,
          page: pageNumber,
          totalPages: 0,
          results: [],
        });
      }
    }

    /* ------------------------------------------------------------------ *
     * 2. CERTIFICATION FILTERING (explicit ?certification= query param)
     * This is a *hard filter* — it only matches on certificationName and
     * is intersected with allowedUserIds from step 1. It is intentionally
     * separate from the certificationBonus scoring in step 7, which is
     * based on the *requested skills*, not this param. Don't conflate
     * the two — see note in step 7.
     * ------------------------------------------------------------------ */
    if (certification) {
      const matchingCertifications = await Certification.find({
        certificationName: new RegExp(
          escapeRegex(certification.trim()),
          "i"
        ),
      })
        .select("userId")
        .lean();

      const certifiedUserIds = new Set(
        matchingCertifications.map((item) => item.userId.toString())
      );

      if (allowedUserIds === null) {
        allowedUserIds = certifiedUserIds;
      } else {
        // Intersect with whatever profile filtering already narrowed down
        allowedUserIds = new Set(
          [...allowedUserIds].filter((userId) =>
            certifiedUserIds.has(userId)
          )
        );
      }

      if (allowedUserIds.size === 0) {
        return res.status(200).json({
          success: true,
          count: 0,
          totalResults: 0,
          page: pageNumber,
          totalPages: 0,
          results: [],
        });
      }
    }

    /* ------------------------------------------------------------------ *
     * 3. SKILL FILTERING
     * Build the Skill query: experience range always applies; skill name
     * match only applies if skills were requested. If allowedUserIds was
     * set by steps 1/2, restrict the skill search to just those users.
     * ------------------------------------------------------------------ */
    const skillQuery = {
      yearsOfExperience: {
        $gte: minimumExperience,
        $lte: maximumExperience,
      },
    };

    if (requestedSkills.length > 0) {
      // Exact (anchored) case-insensitive match against any requested skill name
      skillQuery.$or = requestedSkills.map((skillName) => ({
        skillName: new RegExp(`^${escapeRegex(skillName)}$`, "i"),
      }));
    }

    if (allowedUserIds !== null) {
      skillQuery.userId = {
        $in: [...allowedUserIds],
      };
    }

    let matchingSkills = [];

    // If any skill-related filter was actually provided, query Skill with
    // the full filter (including experience/proficiency constraints).
    // Otherwise (profile/certification-only search with no skill filters),
    // just pull skills for the already-allowed users so we can still show
    // their skill data in the results, without applying skill constraints.
    if (
      requestedSkills.length > 0 ||
      minExperience !== undefined ||
      maxExperience !== undefined ||
      minProficiency
    ) {
      matchingSkills = await Skill.find(skillQuery).lean();
    } else {
      matchingSkills = await Skill.find({
        userId: {
          $in: [...allowedUserIds],
        },
      }).lean();
    }

    // Proficiency filtering happens in-memory (not in Mongo) because it's
    // based on a numeric score derived from proficiencyLevel, not the raw
    // enum value itself.
    if (minimumProficiencyScore > 0) {
      matchingSkills = matchingSkills.filter((skill) => {
        const score =
          PROFICIENCY_SCORES[
            String(skill.proficiencyLevel || "").toLowerCase()
          ] || 0;

        return score >= minimumProficiencyScore;
      });
    }

    /* ------------------------------------------------------------------ *
     * 4. GROUP SKILLS BY EMPLOYEE
     * Collapse the flat list of matching Skill docs into one entry per
     * employee, accumulating their matched skills, a Set of matched skill
     * names (for "all" mode + matchPercentage), and a running skillScore.
     * ------------------------------------------------------------------ */
    const groupedEmployees = new Map();

    for (const skill of matchingSkills) {
      const userId = skill.userId.toString();

      if (!groupedEmployees.has(userId)) {
        groupedEmployees.set(userId, {
          matchedSkills: [],
          matchedSkillNames: new Set(),
          skillScore: 0,
        });
      }

      const employeeData = groupedEmployees.get(userId);

      employeeData.matchedSkills.push({
        _id: skill._id,
        skillName: skill.skillName,
        category: skill.category,
        proficiencyLevel: skill.proficiencyLevel,
        yearsOfExperience: skill.yearsOfExperience,
        source: skill.source,
        endorsementCount: skill.endorsementCount || 0,
        individualScore: calculateSkillScore(skill),
      });

      employeeData.matchedSkillNames.add(
        String(skill.skillName).toLowerCase()
      );

      employeeData.skillScore += calculateSkillScore(skill);
    }

    // Edge case: if someone was found purely via profile/certification
    // filters (no skill filter requested), make sure they still show up
    // in the results even though they have zero matched skills.
    if (allowedUserIds !== null && requestedSkills.length === 0) {
      for (const userId of allowedUserIds) {
        if (!groupedEmployees.has(userId)) {
          groupedEmployees.set(userId, {
            matchedSkills: [],
            matchedSkillNames: new Set(),
            skillScore: 0,
          });
        }
      }
    }

    /* ------------------------------------------------------------------ *
     * 5. ALL-SKILLS MATCHING
     * When matchMode=all, drop any employee who doesn't have EVERY
     * requested skill (not just at least one).
     * ------------------------------------------------------------------ */
    const normalizedRequestedSkills = requestedSkills.map((skill) =>
      skill.toLowerCase()
    );

    let employeeEntries = [...groupedEmployees.entries()];

    if (normalizedMatchMode === "all" && normalizedRequestedSkills.length > 0) {
      employeeEntries = employeeEntries.filter(([, data]) =>
        normalizedRequestedSkills.every((skillName) =>
          data.matchedSkillNames.has(skillName)
        )
      );
    }

    const employeeIds = employeeEntries.map(([userId]) => userId);

    if (employeeIds.length === 0) {
      return res.status(200).json({
        success: true,
        count: 0,
        totalResults: 0,
        page: pageNumber,
        totalPages: 0,
        results: [],
      });
    }

    /* ------------------------------------------------------------------ *
     * 6. FETCH USER, PROFILE AND CERTIFICATIONS
     * One batched round-trip per collection instead of N+1 queries.
     * ------------------------------------------------------------------ */
    const [users, profiles, employeeCertifications] = await Promise.all([
      User.find({
        _id: { $in: employeeIds },
        role: "employee",
      })
        .select("name email role")
        .lean(),

      EmployeeProfile.find({
        userId: { $in: employeeIds },
      }).lean(),

      Certification.find({
        userId: { $in: employeeIds },
      })
        .select(
          "userId certificationName issuingOrganization issueDate expiryDate verificationStatus skills"
        )
        .lean(),
    ]);

    const userMap = new Map(users.map((user) => [user._id.toString(), user]));

    const profileMap = new Map(
      profiles.map((profile) => [profile.userId.toString(), profile])
    );

    // Group certifications by userId for O(1) lookup in step 7
    const certificationMap = new Map();

    for (const item of employeeCertifications) {
      const userId = item.userId.toString();

      if (!certificationMap.has(userId)) {
        certificationMap.set(userId, []);
      }

      certificationMap.get(userId).push(item);
    }

    /* ------------------------------------------------------------------ *
     * 7. BUILD RANKED RESULTS
     * Composite matchScore = skillScore + skillCoverageBonus + certificationBonus
     * ------------------------------------------------------------------ */
    let results = employeeEntries
      .filter(([userId]) => userMap.has(userId))
      .map(([userId, data]) => {
        const certifications = certificationMap.get(userId) || [];

        const matchedSkillCount = data.matchedSkillNames.size;

        // Rewards employees who match MULTIPLE requested skills (only kicks
        // in when more than one skill was requested, so a single-skill
        // search doesn't get an arbitrary flat bonus).
        const coverageBonus =
          requestedSkills.length > 1 ? matchedSkillCount * 2 : 0;

        // --- Certification bonus ------------------------------------------------
        // FIXED: previously this only fired when the `?certification=` query
        // param was supplied and matched a cert name — meaning a plain skill
        // search (e.g. ?skills=aws) never awarded a certification bonus even
        // when the candidate had directly relevant certificates.
        //
        // Now it checks whether the employee holds ANY certification related
        // to ANY of the *requested skills* (not the separate certification
        // filter param above, which remains a hard filter in step 2). A cert
        // is considered related if either:
        //   (a) the requested skill name appears in the certification's name
        //       (e.g. "aws" matches "AWS Certified Solutions Architect"), or
        //   (b) the requested skill is explicitly tagged in the cert's
        //       `skills` array.
        const certificationBonus = requestedSkills.some((skillName) =>
          certifications.some((item) => {
            const certNameMatch = item.certificationName
              .toLowerCase()
              .includes(skillName.toLowerCase());

            const certSkillMatch =
              Array.isArray(item.skills) &&
              item.skills.some(
                (s) => s.toLowerCase() === skillName.toLowerCase()
              );

            return certNameMatch || certSkillMatch;
          })
        )
          ? 2
          : 0;

        const matchScore =
          data.skillScore + coverageBonus + certificationBonus;

        const trustScore = calculateTrustScore({
          matchedSkills: data.matchedSkills,
          certifications,
        });

        return {
          employee: userMap.get(userId),
          profile: profileMap.get(userId) || null,
          matchedSkills: data.matchedSkills,
          certifications,
          trustScore,
          matchedSkillCount,
          requestedSkillCount: requestedSkills.length,
          matchPercentage:
            requestedSkills.length > 0
              ? Math.round((matchedSkillCount / requestedSkills.length) * 100)
              : null,
          scoreBreakdown: {
            skillScore: data.skillScore,
            skillCoverageBonus: coverageBonus,
            certificationBonus,
          },
          matchScore,
        };
      });

    // Highest matchScore first
    results.sort((first, second) => second.matchScore - first.matchScore);

    /* ------------------------------------------------------------------ *
     * 8. PAGINATION
     * ------------------------------------------------------------------ */
    const totalResults = results.length;
    const totalPages = Math.ceil(totalResults / pageLimit);

    const startIndex = (pageNumber - 1) * pageLimit;

    results = results.slice(startIndex, startIndex + pageLimit);

    return res.status(200).json({
      success: true,
      count: results.length,
      totalResults,
      page: pageNumber,
      limit: pageLimit,
      totalPages,
      matchMode: normalizedMatchMode,

      // Echo back the normalized filters actually applied, useful for
      // the frontend to reflect current search state / debugging
      appliedFilters: {
        skills: requestedSkills,
        department: department || null,
        designation: designation || null,
        location: location || null,
        education: education || null,
        certification: certification || null,
        minExperience: minExperience !== undefined ? minimumExperience : null,
        maxExperience: maxExperience !== undefined ? maximumExperience : null,
        minProficiency: normalizedProficiency || null,
      },
      results,
    });
  } catch (error) {
    console.error("Advanced employee search error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to complete advanced employee search",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = {
  searchEmployees,
  advancedEmployeeSearch,
};
