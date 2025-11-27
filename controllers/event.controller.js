const Event = require("../models/event.model");

exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json({ event });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Event creation failed", error: err.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("classId")
      .populate("createdBy", "fullName role");
    res.status(200).json({ events });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch events", error: err.message });
  }
};

exports.getEventsByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const events = await Event.find({ date });
    res.status(200).json({ events });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch events", error: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Event.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ event: updated });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update event", error: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Event.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete event", error: err.message });
  }
};
