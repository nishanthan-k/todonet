import { connectDB } from "../config/db.js";

export const addToDo = async (req, res) => {
  console.log(req.body)
  const { user_id, task } = req.body;
  console.log('reached');
  const client = await connectDB.connect();

  try {
    const q = `
      INSERT INTO todos (task, user_id) 
      VALUES ($1, $2)
    `
    const values = [task, user_id]

    const result = await client.query(q, values);

    res.status(200).json({
      message: 'ToDo added successfully',
      todo: result.rows,
    })

  } catch (error) {
    res.status(500).json({message: 'Internal server error'})
  }
}