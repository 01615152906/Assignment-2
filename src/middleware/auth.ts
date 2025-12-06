


// import { NextFunction, Request, Response } from "express";

// const auth = () => {
//   return async (req: Request, res: Response, next: NextFunction) => {
   
//       const token = req.headers.authorization;
// console.log({authToken: token})
//       next();
//   };
// };

// export default auth;




// import { NextFunction, Request, Response } from "express";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import config from "../config";


// const auth = () => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const token = req.headers.authorization;
//       if (!token) {
//         return res.status(500).json({ message: "You are not allowed!!" });
//       }
//       const decoded = jwt.verify(
//         token,
//         config.jwtSecret as string
//       ) as JwtPayload;
//       console.log({ decoded });
//       req.user = decoded;

//       next();
//     } catch (err: any) {
//       res.status(500).json({
//         success: false,
//         message: err.message,
//       });
//     }
//   };
// };

// export default auth;


// src/middleware/auth.ts

import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

// roles = ["admin", "customer"]
const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1. Authorization header check
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message: "You are not allowed!!",
        });
      }

      // 2. Token extract
      const token = authHeader.split(" ")[1];

      // 3. Token verify
      const decoded = jwt.verify(
        token!,
        config.jwtSecret as string
      ) as JwtPayload;

      // 4. Save decoded user into request
      req.user = decoded;

      // 5. Role check (admin/customer)
      if (roles.length && !roles.includes(decoded.role as string)) {
        return res.status(403).json({
          success: false,
          error: "unauthorized!!!",
        });
      }

      // 6. Next middleware
      next();
    } catch (err: any) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  };
};

export default auth;
