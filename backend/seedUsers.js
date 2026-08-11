require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    const users = [
      {
        name: "System HR",
        email: "hr@skilldiscovery.com",
        password: "HR@12345",
        role: "hr",
      },
      {
        name: "System Manager",
        email: "manager@skilldiscovery.com",
        password: "Manager@12345",
        role: "manager",
      },
      {
        name: "Learning and Development",
        email: "ld@skilldiscovery.com",
        password: "LD@12345",
        role: "ld",
      },
    ];

    for (const data of users) {
      const existingUser = await User.findOne({
        email: data.email,
      });

      if (existingUser) {
        console.log(
          `${data.email} already exists - skipping`
        );
        continue;
      }

      const hashedPassword = await bcrypt.hash(
        data.password,
        10
      );

      await User.create({
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role,
      });

      console.log(
        `${data.role} account created: ${data.email}`
      );
    }

    console.log("Seed completed successfully");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);

    await mongoose.connection.close();
    process.exit(1);
  }
};

seedUsers();