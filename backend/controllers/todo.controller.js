import { connectDB } from "../config/db.js";

export const addToDo = async (req, res) => {
  console.log(req.body)
  const { user_id, task } = req.body;
  console.log('reached');
  const client = await connectDB.connect();

  if (!user_id || !task) {
    res.status(400).json({message: 'User ID and task are required'});
  }

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
  } finally {
    client.release();
  }
}

export const getToDo = async (req, res) => {
  const { user_id } = req.query;
  const client = await connectDB.connect();

  if (!user_id) {
    res.status(400).json({message: 'User ID is required'});
  }
  
  try {
    const q = `
      SELECT t.todo_id, t.task, t.createdAt, t.completed, t.deleted
      FROM todos t 
      JOIN users u ON t.user_id = u.user_id
      WHERE t.user_id = ($1)
    `;

    const result = await client.query(q, [user_id]);

    res.status(200).json({
      estatus: true,
      message: 'ToDo fetched successfully',
      todos: result.rows
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: false,
      message: 'Internal server error'
    })
  } finally {
    client.release();
  } 
}