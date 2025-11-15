const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "student" },
  phone: { type: String },
  admissionNumber: { type: String },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
  parentName: { type: String },
  parentPhone: { type: String },
  gender: { type: String },
  dob: { type: Date },
  subjects: [{ type: String }],
  qualifications: [{ type: String }],
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
  },
});

module.exports = mongoose.model("Student", studentSchema);
