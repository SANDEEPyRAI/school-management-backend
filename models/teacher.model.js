const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "teacher" },

    phone: { type: String },
    gender: { type: String },
    dob: { type: Date },

    subjects: [{ type: String }],
    qualifications: [{ type: String }],

    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      pincode: { type: String }, // 👈 String rakho taaki leading zero preserve ho
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", teacherSchema);
