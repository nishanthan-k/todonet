import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { email, password } = req.body;

  const token = jwt.sign({email, password}, "jsonsecret");

  return res.status(200).json({
    estatus: true,
    message: 'Login successful',
    token: token
  });
}