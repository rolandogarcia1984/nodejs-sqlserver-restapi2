import { getConnection, sql } from "../../database/connection.js";
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'CLAVE_SECRETA_CAMBIALA';

export const getMenu = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token no proporcionado' });

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;

    const pool = await getConnection();
    const result = await pool
      .request()
      .input('UsuarioId', sql.Int, userId)
      .query(`
        SELECT m.Id, m.Titulo, m.Url, m.Icono, m.Orden
        FROM Menu m
        INNER JOIN UsuarioMenu um ON um.MenuId = m.Id
        WHERE um.UsuarioId = @UsuarioId AND m.Activo = 1
        ORDER BY m.Orden
      `);

    res.json(result.recordset);
  } catch (err) {
    console.error('Error al obtener menú:', err);
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
