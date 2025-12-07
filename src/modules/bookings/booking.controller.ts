

import { Request, Response } from "express";


import { bookingServices } from "./booking.service";


const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.creatBooking(req.body);

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result.rows[0],
    });

  } catch (err: any) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: err.message || "Unexpected server error",
    });
  }
};



const getAllBookings =  async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.getAllBookings()
    

    res.status(200).json({
      success: true,
      message: "Successful GET",
      data: result.rows,
    });
  } 
  catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Unexpected server errors",
      datails: err,
    });


  }
}

const getSingleBooking =  async (req: Request, res: Response) => {
 
  try {
    const result = await bookingServices.getSingleBooking(req.params.id as string) ;
 
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Resource doesn't exist",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Successful single users",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Unexpected server errors",
    });
  }
}



const updateBooking = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const result = await bookingServices.updateBooking(id, req.body);

    return res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    return res.status(err.status || 500).json({
      success: false,
      message: "	Unexpected server errors",
    });
  }
};

const deleteBooking  = async (req: Request, res: Response) => {
  // console.log(req.params.id);
  try {
    const result = await bookingServices.deleteBooking(req.params.id!);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Resource doesn't exist",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Successful DELETE",
        data: result.rows,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Unexpected server errors",
    });
  }
}

 export const bookinControllers = {
    createBooking,
    getAllBookings,
    getSingleBooking,
    updateBooking,
    deleteBooking,

 
   

  }