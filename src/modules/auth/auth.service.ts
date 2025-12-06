







// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { pool } from '../../config/db';
// import config from "../../config";




// const loginUser = async (email: string, password: string) => {
//   console.log({ email });
//   const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
//     email,
//   ]);

//   console.log({ result });
//   if (result.rows.length === 0) {
//     return null;
//   }
//   const user = result.rows[0];

//   const match = await bcrypt.compare(password, user.password);

//   console.log({ match, user });
//   if (!match) {
//     return false;
//   }

// //   const secret = "KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30";
//   const token = jwt.sign(
//     { name: user.name, email: user.email}, config.jwtSecret as string ,
   
//     {
//       expiresIn: "7d",
//     }
//   );
//   console.log({token});
// return {token, user}
  
// };

// export const authServices = {
//   loginUser,
// };


// src/modules/auth/auth.service.ts

import { pool } from "../../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";

const signup = async (payload: any) => {
  const { name, email, password, phone, role } = payload;

  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `
    INSERT INTO users (name, email, password, phone, role)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, name, email, phone, role
  `;

  const values = [name, email, hashedPassword, phone, role];

  const result = await pool.query(query, values);

  return result.rows[0];
};

const login = async (payload: any) => {
  const { email, password } = payload;

  const userQuery = `SELECT * FROM users WHERE email = $1`;
  const userResult = await pool.query(userQuery, [email]);

  if (userResult.rowCount === 0) {
    throw new Error("User not found");
  }

  const user = userResult.rows[0];

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new Error("Invalid password");
  }

  // JWT token generate
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    config.jwtSecret as string,
    {
      expiresIn: "7d",
    }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  };
};

export const authServices = { signup, login };
