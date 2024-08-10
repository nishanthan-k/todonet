import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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

export const encryptPassword = async (password, saltRounds = 10) => {
  return await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(hash);
      }
    })
  })
}

export const decryptPassword = async (password, hashedPassword) => {
  return await new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    })
  })
}
