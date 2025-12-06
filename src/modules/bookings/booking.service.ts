







import { pool } from "../../config/db";



const creatBooking = async (payload: Record<string, any>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  // 1) Vehicle rent price fetch
  const vehicleResult = await pool.query(
    `SELECT daily_rent_price FROM vehicles WHERE id = $1`,
    [vehicle_id]
  );

  if (vehicleResult.rows.length === 0) {
    throw new Error("Vehicle not found");
  }

  const dailyRent = Number(vehicleResult.rows[0].daily_rent_price);

  // 2) Date difference (days)
  const start = new Date(rent_start_date);
  const end = new Date(rent_end_date);

  const timeDiff = Math.abs(end.getTime() - start.getTime());
  const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // convert ms to days

  if (days <= 0) {
    throw new Error("Invalid rent dates");
  }

  // 3) total price calculate
  const total_price = dailyRent * days;

  // 4) Insert booking
  const result = await pool.query(
    `
    INSERT INTO bookings(
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      status
    )
    VALUES ($1, $2, $3, $4, $5, 'active')
    RETURNING *
    `,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );

  return result;
};


const getAllBookings = async () =>{

  const result =  await pool.query(`SELECT * FROM bookings`);
  return result;
}


const getSingleBooking = async (id: string) => {
    const result =  await pool.query(`SELECT * FROM bookings WHERE id = $1`, [id]);
    return result;
}





const updateBooking = async (id: number, payload: Record<string, any>) => {
  const { status } = payload;

  const allowed = ["active", "cancelled", "returned"];
  if (!allowed.includes(status)) {
    const error: any = new Error("Invalid booking status");
    error.status = 400;
    throw error;
  }

  const result = await pool.query(
    `
    UPDATE bookings
    SET status = $1
    WHERE id = $2
    RETURNING *
    `,
    [status, id]
  );

  if (result.rows.length === 0) {
    const error: any = new Error("Booking not found");
    error.status = 404;
    throw error;
  }

  return result;
};


const deleteBooking = async (id: string) => {
  const result = await pool.query(
    `DELETE FROM bookings WHERE id = $1 `,
    [id]
  );


  return result;
};

export const bookingServices = {
creatBooking,
getAllBookings,
getSingleBooking,
updateBooking,
deleteBooking,




}