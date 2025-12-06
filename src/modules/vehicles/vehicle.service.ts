

import { pool } from "../../config/db";



const createUser = async (payload: Record<string, unknown>) =>{

  const {vehicle_name, type, registration_number,   daily_rent_price,    availability_status} = payload;

      const result = await pool.query(`
              INSERT INTO vehicles(vehicle_name, type,registration_number,   daily_rent_price,    availability_status) VALUES($1, $2, $3, $4, $5 ) RETURNING *`,
          [vehicle_name, type, registration_number, daily_rent_price, availability_status]
          );
      return result; 
}



const getUser = async () =>{

  const result =  await pool.query(`SELECT * FROM vehicles`);
  return result;
}

const getSingleUser = async (id: string) => {
    const result =  await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [id]);
    return result;
}


// const updateUser = async (vehicle_name:string,  type:string,  id: string) =>{
//        const result = await pool.query(
//       `UPDATE vehicles SET  vehicle_name=$1,  type=$2 WHERE id=$3 RETURNING *`,
//       [vehicle_name, type,  id]
//     );
//     return result;
// }



const updateUser  = async (id: number, data: any) => {
  const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = data;

  return await pool.query(
    `UPDATE vehicles SET 
      vehicle_name=$1,
      type=$2,
      registration_number=$3,
      daily_rent_price=$4,
      availability_status=$5
     WHERE id=$6 RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      id,
    ]
  );
};






const deleteUser = async (id: string) =>{
     const result = await pool.query(`DELETE FROM vehicles WHERE id = $1`, [id]);

    return result;
}



export const vehicleServer = {
    createUser,
    getUser,
    getSingleUser,
    deleteUser,
    updateUser,
}