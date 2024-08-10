import jwt from 'jsonwebtoken';
import { connectDB } from "../config/db.js";
import { sendInternalError } from '../responses/sendInteralError.js';

export const login = async (req, res) => {
  const { email, password } = req.body;
  const client = await connectDB.connect();

  try {
    const q = `
      SELECT user_id, password
      FROM users
      WHERE email = ($1)
      LIMIT 1;
    `;

    const values = [email];

    const result = await client.query(q, values);

    if (result.rows.length === 0) {
      return res.status(200).json({
        estatus: false,
        message: 'User not found',
      })
    } else {
      if (password !== result.rows[0].password) {
        return res.status(200).json({
          estatus: false,
          message: 'Wrong password'
        })
      } else {
        const token = jwt.sign({email, password}, "jsonsecret");

        return res.status(200).json({
          estatus: true,
          message: 'Login successful',
          token: token,
          user_id: result.rows[0].user_id,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      estatus: false,
      message: 'Internal server error'
    })
  } finally {
    client.release();
  }
}

export const signup = async (req, res) => {
  const { email, password } = req.body;
  const client = await connectDB.connect();

  console.log(email, password)

  try {
    const q = `
      INSERT INTO users (email, password)
      VALUES ($1, $2)
      RETURNING user_id
    `;

    const values = [email, password];

    const result = await client.query(q, values);

    const token = jwt.sign({email, password}, "jsonsecret");

    return res.status(200).json({
      estatus: true,
      message: 'User created successfully',
      user_id: result.rows[0].user_id,
      token: token
    })
  } catch (error) {
    console.log(error)
    sendInternalError(req, res);
  } finally {
    client.release();
  }
}