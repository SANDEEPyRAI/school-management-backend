const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g. "Route A"
    stops: [String],
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
    studentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Route", routeSchema);
