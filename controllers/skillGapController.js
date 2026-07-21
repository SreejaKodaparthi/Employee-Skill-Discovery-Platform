const User = require("../models/User");
const Skill = require("../models/Skill");
const RoleRequirement = require("../models/RoleRequirement");

const normalize = (skill) =>
  skill.trim().toLowerCase();

const generateSkillGapReport = async (req, res) => {
  try {
    const { employeeId, roleId } = req.params;

    const employee = await User.findById(employeeId);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const role = await RoleRequirement.findById(roleId);

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role requirement not found",
      });
    }

    const employeeSkills = await Skill.find({
      userId: employeeId,
    });

    const employeeSkillNames = employeeSkills.map((skill) =>
      normalize(skill.skillName)
    );

    const requiredSkills = role.requiredSkills.map((skill) =>
      normalize(skill.skillName)
    );

    const matchedSkills = [];
    const missingSkills = [];
    const extraSkills = [];

    requiredSkills.forEach((skill) => {
      if (employeeSkillNames.includes(skill)) {
        matchedSkills.push(skill);
      } else {
        missingSkills.push(skill);
      }
    });

    employeeSkillNames.forEach((skill) => {
      if (!requiredSkills.includes(skill)) {
        extraSkills.push(skill);
      }
    });

    const matchPercentage =
      requiredSkills.length === 0
        ? 100
        : Math.round(
            (matchedSkills.length /
              requiredSkills.length) *
              100
          );

    return res.status(200).json({
      success: true,

      employee: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
      },

      role: {
        id: role._id,
        roleName: role.roleName,
      },

      totalRequiredSkills: requiredSkills.length,

      matchedSkills,

      missingSkills,

      extraSkills,

      matchPercentage,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  generateSkillGapReport,
};