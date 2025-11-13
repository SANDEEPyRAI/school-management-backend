const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "teacher", "student"],
      default: "student",
    },
    gender: { type: String, enum: ["male", "female", "other"] },
    dob: { type: Date },
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
    },
    profileImage: { type: String },
    qualifications: [String],
    subjects: [String],
    admissionNumber: { type: String },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
    parentName: String,
    parentPhone: String,
    permissions: {
      type: Map,
      of: [String],
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
