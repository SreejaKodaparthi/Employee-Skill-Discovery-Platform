// const SkillCatalog = require("../models/SkillCatalog");

// const normalizeSkillName = async (skillName) => {
//   if (!skillName || typeof skillName !== "string") {
//     return skillName;
//   }

//   const input = skillName.trim().toLowerCase();

//   const catalogSkill = await SkillCatalog.findOne({
//     isActive: true,
//     $or: [
//       {
//         skillName: {
//           $regex: new RegExp(`^${input}$`, "i"),
//         },
//       },
//       {
//         aliases: {
//           $elemMatch: {
//             $regex: new RegExp(`^${input}$`, "i"),
//           },
//         },
//       },
//     ],
//   });

//   if (catalogSkill) {
//     return catalogSkill.skillName;
//   }

//   return skillName.trim();
// };

// module.exports = {
//   normalizeSkillName,
// };
const SkillCatalog = require("../models/SkillCatalog");

const escapeRegex = (text) => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const normalizeSkillName = async (skillName) => {
  if (!skillName || typeof skillName !== "string") {
    return skillName;
  }

  const input = skillName.trim().toLowerCase();

  const escapedInput = escapeRegex(input);

  const catalogSkill = await SkillCatalog.findOne({
    isActive: true,
    $or: [
      {
        skillName: {
          $regex: new RegExp(`^${escapedInput}$`, "i"),
        },
      },
      {
        aliases: {
          $elemMatch: {
            $regex: new RegExp(`^${escapedInput}$`, "i"),
          },
        },
      },
    ],
  });

  if (catalogSkill) {
    return catalogSkill.skillName;
  }

  return skillName.trim();
};

module.exports = {
  normalizeSkillName,
};