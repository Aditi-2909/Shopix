const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const User = require("./model/User");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected");

    // purono admin thakle delete
    await User.deleteOne({ email: "admin@gmail.com" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);

    const admin = await User.create({
      name: "Shopix Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin", 
    });

    console.log("✅ Admin Created Successfully!");
    console.log("Email: admin@gmail.com");
    console.log("Pass: admin123");
    console.log(admin);
    process.exit();
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
};

createAdmin();