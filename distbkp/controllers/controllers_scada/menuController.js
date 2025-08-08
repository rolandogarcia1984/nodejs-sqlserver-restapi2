"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMenu = void 0;
const connection_js_1 = require("../../database/connection.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = 'CLAVE_SECRETA_CAMBIALA';
const getMenu = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ message: 'Token no proporcionado' });
    try {
        const token = authHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        const userId = decoded.id;
        const pool = await (0, connection_js_1.getConnection)();
        const result = await pool
            .request()
            .input('UsuarioId', connection_js_1.sql.Int, userId)
            .query(`
        SELECT m.Id, m.Titulo, m.Url, m.Icono, m.Orden
        FROM Menu m
        INNER JOIN UsuarioMenu um ON um.MenuId = m.Id
        WHERE um.UsuarioId = @UsuarioId AND m.Activo = 1
        ORDER BY m.Orden
      `);
        res.json(result.recordset);
    }
    catch (err) {
        console.error('Error al obtener menú:', err);
        res.status(401).json({ message: 'Token inválido o expirado' });
    }
};
exports.getMenu = getMenu;
