"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarJWT = void 0;
// src/middlewares/jwt.js
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = 'clave_super_secreta'; // Reemplaza en producción
const validarJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ message: "Token requerido" });
    const token = authHeader.split(" ")[1];
    jsonwebtoken_1.default.verify(token, SECRET_KEY, (err, decoded) => {
        if (err)
            return res.status(401).json({ message: "Token inválido" });
        req.user = decoded;
        next();
    });
};
exports.validarJWT = validarJWT;
