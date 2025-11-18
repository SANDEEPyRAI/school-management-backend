// Checks permission for reading users
exports.canReadUsers = (req, res, next) => {
  const user = req.user;

  if (user.role === "admin") return next();

  if (user.role === "teacher") {
    const perms = user.permissions?.get?.("users") || user.permissions?.users;
    const allowed =
      Array.isArray(perms) &&
      (perms.includes("read") || perms.includes("edit"));
    if (allowed) return next();
  }

  // Allow self-read via /api/users/:userId if matches
  if (req.params.userId && req.params.userId === String(user._id))
    return next();

  return res.status(403).json({ message: "Not authorized to read users" });
};

// Checks permission for editing users
exports.canEditUsers = (req, res, next) => {
  const user = req.user;

  if (user.role === "admin") return next();

  if (user.role === "teacher") {
    const perms = user.permissions?.get?.("users") || user.permissions?.users;
    const allowed = Array.isArray(perms) && perms.includes("edit");
    if (allowed) return next();
  }

  // Allow self-update via /api/users/:userId
  if (req.params.userId && req.params.userId === String(user._id))
    return next();

  return res.status(403).json({ message: "Not authorized to edit users" });
};
