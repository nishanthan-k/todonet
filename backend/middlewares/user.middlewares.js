import { connectDB } from "../config/db.js";

export const isUserAlreadyExists = async (req, res, next) => {
  const { email } = req.body;
  const client = await connectDB.connect();

  try {
    const q = `
      SELECT email
      FROM users
      WHERE email = ($1)
    `;

    const values = [email];

    const result = await client.query(q, values);

    if (result.rows.length > 0) {
      return res.status(200).json({
        estatus: false,
        message: 'User already exists'
      })
    }
    
    next();
  } catch (error) {
    
  } finally {
    client.release();
  }
}