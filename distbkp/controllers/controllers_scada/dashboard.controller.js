"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductos = exports.getRecetas = exports.getProducciones = exports.getOrdenes = void 0;
const connection_js_1 = require("../../database/connection.js");
const getOrdenes = async (req, res) => {
    try {
        const pool = await (0, connection_js_1.getConnection)();
        const result = await pool.request().query("SELECT TOP 20 * FROM ordenesproduccion");
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener órdenes", error });
    }
};
exports.getOrdenes = getOrdenes;
const getProducciones = async (req, res) => {
    try {
        const pool = await (0, connection_js_1.getConnection)();
        const result = await pool.request().query("SELECT TOP 20 * FROM reservasproduccion");
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener producciones", error });
    }
};
exports.getProducciones = getProducciones;
const getRecetas = async (req, res) => {
    try {
        const pool = await (0, connection_js_1.getConnection)();
        const result = await pool.request().query("SELECT TOP 20 * FROM reservasproductos");
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener reservas de productos", error });
    }
};
exports.getRecetas = getRecetas;
const getProductos = async (req, res) => {
    try {
        const pool = await (0, connection_js_1.getConnection)();
        const result = await pool.request().query("SELECT TOP 20 * FROM productos");
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener productos", error });
    }
};
exports.getProductos = getProductos;
