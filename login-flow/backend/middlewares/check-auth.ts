import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function checkAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.get("access-token");

  if (!token) {
    return res.sendStatus(403);
  }

  try {
    var decoded = jwt.verify(token, "secret_string123");
    console.log({ decoded });
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
}
