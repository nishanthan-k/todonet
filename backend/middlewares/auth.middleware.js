import jwt from 'jsonwebtoken';

export const verifyJWT = async (req, res, next) => {
  const { token } = req.query;

  if (!token) {
    return res.status(200).json({
      estatus: false,
      message: 'Token required'
    });
  }

  jwt.verify(token, 'jsonsecret', (err) => {
    if (err) {
      return res.status(200).json({
        estatus: false,
        message: 'Invalid token'
      })
    }

    next();
  })
}