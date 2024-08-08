CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(100),
  password VARCHAR(1000)
);


CREATE TABLE todos (
  todo_id SERIAL PRIMARY KEY,
  task TEXT NOT NULL ,
  user_id INT REFERENCES users(user_id),
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW(),
  "isCompleted" BOOLEAN DEFAULT false,
  "isDeleted" BOOLEAN DEFAULT false
);
