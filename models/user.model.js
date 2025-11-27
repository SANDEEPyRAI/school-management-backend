// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     fullName: { type: String, required: true },
//     email: { type: String, unique: true, required: true },
//     phone: { type: String, required: true },
//     password: { type: String, required: true },
//     role: {
//       type: String,
//       enum: ["admin", "teacher", "student"],
//       default: "student",
//     },
//     gender: { type: String, enum: ["male", "female", "other"] },
//     dob: { type: Date },
//     address: {
//       street: String,
//       city: String,
//       state: String,
//       pincode: String,
//     },
//     profileImage: { type: String },
//     qualifications: [String],
//     subjects: [String],
//     admissionNumber: { type: String },
//     classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
//     parentName: String,
//     parentPhone: String,
//     permissions: {
//       type: Map,
//       of: [String],
//       default: {},
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", userSchema);
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

    // ✅ Boolean permissions per module
    permissions: {
      attendance: {
        view: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
      },
      students: {
        view: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
      },
      teachers: {
        view: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
      },
      classes: {
        view: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
      },
      exams: {
        view: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
      },
      results: {
        view: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
      },
      fees: {
        view: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
      },
      dashboard: {
        view: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
      },
      events: {
        view: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
      },
      library: {
        view: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
      },
      notices: {
        view: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
      },
      timetable: {
        view: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
      },
      transport: {
        view: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
      },
      users: {
        view: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
