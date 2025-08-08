"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const connection_js_1 = require("../../database/connection.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = 'clave_secreta_simple_para_dev';
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const pool = await (0, connection_js_1.getConnection)();
        const result = await pool
            .request()
            .input('Usuario', connection_js_1.sql.NVarChar, username)
            .input('Contrasena', connection_js_1.sql.NVarChar, password)
            .query('SELECT * FROM Usuarios WHERE Usuario = @Usuario AND Contrasena = @Contrasena AND Activo = 1');
        const user = result.recordset[0];
        if (!user) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.Id, nombre: user.Nombre }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    }
    catch (err) {
        console.error('Error en login:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
exports.login = login;
