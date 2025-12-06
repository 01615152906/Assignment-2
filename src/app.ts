

import express, { Request, Response } from "express";
import logger from "./middleware/logger";
import initDB from "./config/db";
import { userRoutes } from "./modules/users/user.routes";
import { vehicleRoutes } from "./modules/vehicles/vehicle.routes";
import { bookinRoutes } from "./modules/bookings/booking.routes";
import { authRoutes } from "./modules/auth/auth.routes";



const app = express();


app.use(express.json());

initDB();

app.get('/', logger, (req: Request, res: Response) => {
  res.send('Vehicle-rental-system!')
})

// users table
app.use("/api/v1/users", userRoutes);
 // vehicle table
 app.use("/api/v1/vehicles", vehicleRoutes)

 // booking table
 app.use("/api/v1/bookings",bookinRoutes)

 //auth routes
app.use("/api/v1/auth", authRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Resource doesn't exist",
    path: req.path,
  });
});

export default app;