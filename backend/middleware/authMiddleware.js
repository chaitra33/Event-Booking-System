const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid login" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ VERY IMPORTANT
    req.user = {
      id: decoded.id,
      isAdmin: decoded.isAdmin,
      email: decoded.email // optional
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid login" });
  }
};
