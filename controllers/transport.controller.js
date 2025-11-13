const Vehicle = require("../models/vehicle.model");
const Route = require("../models/route.model");

exports.addVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json({ vehicle });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add vehicle", error: err.message });
  }
};

exports.createRoute = async (req, res) => {
  try {
    const route = await Route.create(req.body);
    res.status(201).json({ route });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create route", error: err.message });
  }
};

exports.assignStudentsToRoute = async (req, res) => {
  try {
    const { routeId } = req.params;
    const { studentIds } = req.body;
    const updated = await Route.findByIdAndUpdate(
      routeId,
      {
        $addToSet: { studentIds: { $each: studentIds } },
      },
      { new: true }
    );
    res.status(200).json({ updated });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to assign students", error: err.message });
  }
};

exports.getRouteDetails = async (req, res) => {
  try {
    const { routeId } = req.params;
    const route = await Route.findById(routeId).populate(
      "vehicleId studentIds",
      "fullName email"
    );
    res.status(200).json({ route });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch route", error: err.message });
  }
};
