


import  express, { Request, Response }  from 'express';

import logger from '../../middleware/logger';
import { bookinControllers } from './booking.controller';
import auth from '../../middleware/auth';


const router = express.Router();





router.post("/", logger, auth("admin", "customer"), bookinControllers.createBooking)

router.get("/", auth(), bookinControllers.getAllBookings )
router.get("/:id", auth(), bookinControllers.getSingleBooking)

router.put("/:id", auth(), bookinControllers.updateBooking)

router.delete("/:id", auth(), bookinControllers.deleteBooking)

export const bookinRoutes = router;