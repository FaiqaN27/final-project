import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "You are not authorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      console.error("Token verification error:", error);
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ success: false, message: "Token has expired" });
      }
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    console.log("Token verified, user data:", user);
    req.user = user;
    next();
  });
};


export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    const userRole = req.user.role;

    console.log("User role:", userRole);

    if (userRole.toLowerCase() === "admin") {
      next();
    } else {
      return res
        .status(403)
        .json({ success: false, message: "You're not authorized" });
    }
  });
};

// Optional: verifyUser middleware
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (
      req.user.id === req.params.id ||
      req.user.email === process.env.ADMIN_EMAIL
    ) {
      next(); // Proceed if user is either the owner or admin
    } else {
      return res
        .status(403)
        .json({ success: false, message: "You're not authenticated" });
    }
  });
};


