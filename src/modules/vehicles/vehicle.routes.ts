


import { Router } from "express";
import { vehicleControllers } from "./vehicle.controller";
import logger from "../../middleware/logger";
import auth from "../../middleware/auth";
const router = Router();


router.post("/",logger, auth("admin"),  vehicleControllers.createUser);


router.get("/", logger,  vehicleControllers.getUser )
router.get("/:id", vehicleControllers.getSingleUser)

router.put("/:id", logger, auth("admin"), vehicleControllers.updateUser)
router.delete("/:id", logger, auth("admin"), vehicleControllers.deleteUser)

export const vehicleRoutes = router;
