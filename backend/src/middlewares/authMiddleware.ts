// import { Request, Response, NextFunction } from "express";
// import jwt, { JwtPayload } from "jsonwebtoken";

// const SECRET_KEY = process.env.SECRET_KEY || "your-secret-key";

// export const authenticateToken = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const authHeaders = req.headers["authorization"];
//   const token = authHeaders && authHeaders.split(" ")[1];

//   if (!token) {
//     res.status(401).json({ message: "Access denied. No token provided." });
//     return;
//   }

//   try {
//     const decoded = jwt.verify(token, SECRET_KEY);
//     (req as any).user = decoded;
//     next();
//   } catch (error) {
//     res.status(403).json({ message: "Unauthorized" });
//     return;
//   }
// };

import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "your-secret-key";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // <-- explicitly returns void
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return; // <-- just return to stop execution, don't return the Response
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        res.status(401).json({ message: "Token expired. Please login again." });
        return;
      }
      res.status(403).json({ message: "Invalid token." });
      return;
    }

    (req as any).user = decoded as JwtPayload;
    next(); // only call next if token is valid
  });
};
