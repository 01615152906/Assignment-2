



import { Request, Response } from "express";

import { pool } from "../../config/db";
import { userServices } from "./user.service";


const createUser = async (req: Request, res: Response ) =>{
    
 const {name, email, password, phone, role} = req.body;
     
  try {
  
         
      const result = await userServices.creatUser(req.body)
    
       res.status(201).json({
          success: false,
          message:"Successful POST (resource created)",
          data: result.rows[0],
      })
      res.send({message:"data inserted"})
      
  } catch (err: any) {
      res.status(500).json({
          success: false,
          message: "Unexpected server errors"
      })
      
  }
  
  }


const getUser =  async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUser()
    

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

const getSingleUser =  async (req: Request, res: Response) => {
 
  try {
    const result = await userServices.getSingleuser(req.params.id as string) ;
 
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


const updateUser = async (req: Request, res: Response) => {
  // console.log(req.params.id);
  const { name, email } = req.body;
  try {
    const result = await userServices.updateUser(name, email, req.params.id!) ;

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Resource doesn't exist",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Successful  PUT",
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

const deleteUser = async (req: Request, res: Response) => {
  // console.log(req.params.id);
  try {
    const result = await userServices.deleteUser(req.params.id!);

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


 export const userControllers = {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser,
   

  }