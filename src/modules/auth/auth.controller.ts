


// import { Request, Response } from "express";
// import { authServices } from "./auth.service";

// const loginUser = async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   try {
//     const result = await authServices.loginUser(email, password);
//     // console.log(result.rows[0]);
//     res.status(200).json({
//       success: false,
//       message: "login successful",
//       data: result,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

// export const authController = {
//   loginUser,
// };



// src/modules/auth/auth.controller.ts

import { Request, Response } from "express";
import { authServices } from "./auth.service";

const signup = async (req: Request, res: Response) => {
  try {
    const result = await authServices.signup(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: "Validation errors, invalid input",
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const result = await authServices.login(req.body);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token: result.token,
      user: result.user,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: "Validation errors, invalid input",
    });
  }
};

export const authControllers = { signup, login };
