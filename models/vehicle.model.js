const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    numberPlate: { type: String, required: true, unique: true },
    type: { type: String, enum: ["bus", "van"], required: true },
    capacity: { type: Number, required: true },
    driverName: { type: String },
    driverPhone: { type: String },
    assignedRoute: { type: mongoose.Schema.Types.ObjectId, ref: "Route" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
