const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret";

const AuthMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided." });

  try {
    const decode = jwt.verify(token, JWT_SECRET);
    req.user = decode; // sets req.user = { id: ... }
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = AuthMiddleware;