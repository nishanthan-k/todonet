import { connectDB } from "../config/db.js";

export const addToDo = async (req, res) => {
  const { user_id } = req.query;
  const { task } = req.body;
  console.log('reached', user_id);
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

    await getRecentToDo(req, res);
  } catch (error) {
    res.status(500).json({message: 'Internal server error 1'})
  } finally {
    client.release();
  }
}

export const getRecentToDo = async (req, res) => {
  const { user_id } = req.query;

  const client = await connectDB.connect();

  if (!user_id) {
    res.status(400).json({message: 'User ID is required'});
  }

  try {
    const q = `
      SELECT t.todo_id, t.task, t.createdAt, t.isCompleted, t.isDeleted
      FROM todos t 
      JOIN users u ON t.user_id = u.user_id
      WHERE t.user_id = ($1)
      ORDER BY t.createdAt DESC
      LIMIT 1
    `
    const values = [user_id]

    const result = await client.query(q, values);

    res.status(200).json({
      estatus: true,
      message: 'ToDo added successfully',
      todo: result.rows,
    })
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Internal server error'
    })
  } finally {
    client.release();
  }
}

export const getToDo = async (req, res) => {
  const { user_id } = req.query;
  console.log('userid', user_id)
  const client = await connectDB.connect();

  if (!user_id) {
    res.status(400).json({message: 'User ID is required'});
  }
  
  try {
    const q = `
      SELECT t.todo_id, t.task, t.createdAt, t.isCompleted, t.isDeleted
      FROM todos t 
      JOIN users u ON t.user_id = u.user_id
      WHERE t.user_id = ($1) AND isDeleted = false
      ORDER BY t.createdAt DESC
    `;

    const values = [user_id]

    const result = await client.query(q, values);

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

export const completeToDo = async (req, res) => {
  console.log('reached complete');
  const { user_id } = req.query;
  const { todo_id } = req.body;
  const client = await connectDB.connect();

  if (!user_id) {
    res.status(400).json({estatus: false, message: 'user_id is required'});
  }

  try {
    const q = `
      UPDATE todos
      SET isCompleted = NOT isCompleted
      WHERE user_id = ($1) AND todo_id = ($2)
    `;

    const values = [user_id, todo_id];

    const result = await client.query(q, values);

    res.status(200).json({
      estatus: true,
      message: 'Todo updated for complete task'
    })

    // await getToDo(req, res);
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

export const deleteToDo = async (req, res) => {
  const { user_id } = req.query;
  const { todo_id } = req.body;
  const client = await connectDB.connect();

  try {
    const q = `
      UPDATE todos
      SET isDeleted = NOT isDeleted
      WHERE user_id = ($1) AND todo_id = ($2)
    `;

    const values = [user_id, todo_id];

    const result = await client.query(q, values);

    // await getToDo(req, res);
    res.status(200).json({
      estatus: true,
      message: 'Todo updated for delete task'
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      estatus: false,
      message: 'Internal server error'
    })
  } finally {
    client.release();
  }
}