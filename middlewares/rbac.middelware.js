function checkPermission(module, action) {
  return (req, res, next) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // ✅ Admin bypass: agar role admin hai to permission check ki zarurat nahi
    if (user.role === "admin") {
      return next();
    }

    const perms = user.permissions || {};
    const modulePerms = perms[module];

    if (!modulePerms) {
      return res
        .status(403)
        .json({ message: `Forbidden: No permissions for module ${module}` });
    }

    // ✅ Boolean check for view/edit
    if (modulePerms[action] === true) {
      return next();
    }

    return res.status(403).json({
      message: `Forbidden: No ${action} permission for module ${module}`,
    });
  };
}

module.exports = { checkPermission };
