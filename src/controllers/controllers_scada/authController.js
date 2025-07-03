import { getConnection, sql } from "../../database/connection.js";
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'clave_secreta_simple_para_dev';

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('Usuario', sql.NVarChar, username)
      .input('Contrasena', sql.NVarChar, password)
      .query('SELECT * FROM Usuarios WHERE Usuario = @Usuario AND Contrasena = @Contrasena AND Activo = 1');

    const user = result.recordset[0];
    if (!user) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    const token = jwt.sign(
      { id: user.Id, nombre: user.Nombre },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
