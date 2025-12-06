import { Request, Response } from "express";
import { vehicleServer } from "./vehicle.service";



const createUser = async (req: Request, res: Response ) =>{
    

     
  try {
  
         
      const result = await vehicleServer.createUser(req.body)
    
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
      const result = await vehicleServer.getUser()
      
  
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
      const result = await vehicleServer.getSingleUser(req.params.id as string) ;
   
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
  
  
// const updateUser = async (req: Request, res: Response) => {
//   // console.log(req.params.id);
//   const { vehicle_name,  type } = req.body;
//   try {
//     const result = await vehicleServer.updateUser(vehicle_name, type, req.params.id!) ;

//     if (result.rows.length === 0) {
//       res.status(404).json({
//         success: false,
//         message: "Resource doesn't exist",
//       });
//     } else {
//       res.status(200).json({
//         success: true,
//         message: "Successful  PUT",
//         data: result.rows[0],
//       });
//     }
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: "Unexpected server errors",
//     });
//   }
// }


const updateUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await vehicleServer.updateUser(id, req.body);

    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: "Unexpected server errors" });
  }
};


  
  const deleteUser = async (req: Request, res: Response) => {
    // console.log(req.params.id);
    try {
      const result = await vehicleServer.deleteUser(req.params.id!);
  
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

  export const vehicleControllers = {
createUser,
getUser,
getSingleUser,
deleteUser,
updateUser,
  }