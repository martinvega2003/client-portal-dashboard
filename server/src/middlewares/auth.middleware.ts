import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt.js";

interface AuthRequest extends Request {
  user?: { id: number; email: string };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {

    // Get the token from Authorization header: "Bearer <token>"
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Extract the token
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Invalid token format" });
    }

    // Verify the token
    const decoded = verifyJwt(token) as { sub: string; email: string };
    if (!decoded || !decoded.sub) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    // Attach user info to request object
    req.user = {
      id: Number(decoded.sub), // convert sub to number
      email: decoded.email,
    };

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};