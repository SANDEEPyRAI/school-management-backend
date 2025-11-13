const Notice = require("../models/notice.model");

exports.createNotice = async (req, res) => {
  try {
    const notice = await Notice.create({
      ...req.body,
      createdBy: req.user._id,
    });
    res.status(201).json({ notice });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create notice", error: err.message });
  }
};

exports.getNoticesForUser = async (req, res) => {
  try {
    const { role, classId } = req.user;
    const notices = await Notice.find({
      $or: [{ targetRoles: role }, { targetClasses: classId }],
    }).sort({ createdAt: -1 });

    res.status(200).json({ notices });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch notices", error: err.message });
  }
};
