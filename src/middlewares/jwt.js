// src/middlewares/jwt.js
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'clave_super_secreta'; // Reemplaza en producción

export const validarJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token requerido" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token inválido" });

    req.user = decoded;
    next();
  });
};
