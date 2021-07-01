import { Request, Response, NextFunction } from "express";

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) res.status(403).send("User is not authenticated.");
  else {
    const bearer = authorization.split(" ");
    const token = bearer[1];
    req["user_id"] = parseInt(token);
    next();
  }
};

export { checkToken };
