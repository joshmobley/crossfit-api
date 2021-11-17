import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/generateToken";

const checkAccessToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req && req.headers && req.headers["x-access-token"];

  if (!token) return res.status(403).send("No token provided.");

  try {
    const user = verifyAccessToken(token);
    req["user_id"] = user.id;
  } catch (err) {
    return res.status(403).send("Invalid token provided.");
  }

  next();
};

export { checkAccessToken };
