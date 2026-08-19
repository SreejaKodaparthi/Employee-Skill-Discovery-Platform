const mongoose = require("mongoose");
const SkillCatalog = require("./models/SkillCatalog");
require("dotenv").config();

const skills = [
  // Programming
  { skillName: "Java", category: "Programming", aliases: ["java"] },
  { skillName: "Python", category: "Programming", aliases: ["python", "py"] },
  { skillName: "C", category: "Programming", aliases: ["c"] },
  { skillName: "C++", category: "Programming", aliases: ["cpp", "c plus plus"] },
  { skillName: "JavaScript", category: "Programming", aliases: ["javascript", "js"] },
  { skillName: "TypeScript", category: "Programming", aliases: ["typescript", "ts"] },

  // Frontend
  { skillName: "React", category: "Frontend", aliases: ["react", "reactjs"] },
  { skillName: "HTML", category: "Frontend", aliases: ["html"] },
  { skillName: "CSS", category: "Frontend", aliases: ["css"] },
  { skillName: "Angular", category: "Frontend", aliases: ["angular"] },
  { skillName: "Vue.js", category: "Frontend", aliases: ["vue", "vuejs"] },

  // Backend
  { skillName: "Node.js", category: "Backend", aliases: ["node", "nodejs"] },
  { skillName: "Express.js", category: "Backend", aliases: ["express", "expressjs"] },
  { skillName: "REST API", category: "Backend", aliases: ["rest", "rest api"] },

  // Database
  { skillName: "SQL", category: "Database", aliases: ["sql"] },
  { skillName: "MySQL", category: "Database", aliases: ["mysql"] },
  { skillName: "MongoDB", category: "Database", aliases: ["mongodb", "mongo"] },
  { skillName: "PostgreSQL", category: "Database", aliases: ["postgres", "postgresql"] },

  // AI/ML
  { skillName: "Machine Learning", category: "AI/ML", aliases: ["ml"] },
  { skillName: "Deep Learning", category: "AI/ML", aliases: ["dl"] },
  { skillName: "TensorFlow", category: "AI/ML", aliases: ["tensorflow"] },
  { skillName: "PyTorch", category: "AI/ML", aliases: ["pytorch"] },
  { skillName: "Scikit-learn", category: "AI/ML", aliases: ["sklearn", "scikit learn"] },
  { skillName: "NLP", category: "AI/ML", aliases: ["nlp", "natural language processing"] },

  // CS
  { skillName: "Data Structures and Algorithms", category: "Programming", aliases: ["dsa", "data structures", "algorithms"] },
  { skillName: "Object-Oriented Programming", category: "Programming", aliases: ["oop"] },
  { skillName: "DBMS", category: "Database", aliases: ["dbms", "database management system"] },

  // Cloud / DevOps
  { skillName: "AWS", category: "Cloud", aliases: ["aws", "amazon web services"] },
  { skillName: "Docker", category: "DevOps", aliases: ["docker"] },
  { skillName: "Kubernetes", category: "DevOps", aliases: ["k8s", "kubernetes"] },
  { skillName: "Git", category: "DevOps", aliases: ["git"] },
  { skillName: "GitHub", category: "DevOps", aliases: ["github"] },
];

async function seedSkills() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    for (const skill of skills) {
      await SkillCatalog.updateOne(
        { normalizedName: skill.skillName.toLowerCase() },
        {
          $set: {
            skillName: skill.skillName,
            normalizedName: skill.skillName.toLowerCase(),
            category: skill.category,
            aliases: skill.aliases,
            isActive: true,
          },
        },
        { upsert: true }
      );
    }

    console.log("Skill Catalog seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seedSkills();