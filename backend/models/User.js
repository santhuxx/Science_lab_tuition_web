const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    grade: { type: String, required: true },
    birthDate: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    schoolName: { type: String, required: true },
    address: { type: String, required: true },
    parentMobile: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "student" }, // Default role as "student"
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();  // Only hash password if it's modified
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);  // Propagate error if bcrypt hashing fails
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
