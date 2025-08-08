"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReserva = exports.updateReserva = exports.createReserva = exports.getReservaByOp = exports.getAllReservas = void 0;
const connection_js_1 = require("../../database/connection.js");
// Obtener todas las reservas
const getAllReservas = async (req, res) => {
    try {
        const pool = await (0, connection_js_1.getConnection)();
        const result = await pool.request().query("SELECT * FROM ReservasProductos");
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getAllReservas = getAllReservas;
// Obtener una reserva por OP
const getReservaByOp = async (req, res) => {
    const { op } = req.params;
    try {
        const pool = await (0, connection_js_1.getConnection)();
        const result = await pool
            .request()
            .input("D4_OP", connection_js_1.sql.varchar, op)
            .query("SELECT * FROM ReservasProductos WHERE D4_OP = @D4_OP");
        if (!result.recordset[0])
            return res.status(404).json({ msg: "Reserva no encontrada" });
        res.json(result.recordset[0]);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getReservaByOp = getReservaByOp;
// Crear nueva reserva
const createReserva = async (req, res) => {
    const { D4_FILIAL, D4_COD, D4_LOCAL, D4_QUANT, D4_QTDEORI, D4_DATA, D4_OP, D4_PRODUTO } = req.body;
    if (!D4_FILIAL || !D4_COD || !D4_LOCAL || D4_QUANT == null || D4_DATA == null || !D4_OP || !D4_PRODUTO) {
        return res.status(400).json({ msg: "Campos obligatorios faltantes" });
    }
    try {
        const pool = await (0, connection_js_1.getConnection)();
        const result = await pool
            .request()
            .input("D4_FILIAL", connection_js_1.sql.VarChar, D4_FILIAL)
            .input("D4_COD", connection_js_1.sql.VarChar, D4_COD)
            .input("D4_LOCAL", connection_js_1.sql.VarChar, D4_LOCAL)
            .input("D4_QUANT", connection_js_1.sql.Decimal(18, 4), D4_QUANT)
            .input("D4_QTDEORI", connection_js_1.sql.Decimal(18, 4), D4_QTDEORI)
            .input("D4_DATA", connection_js_1.sql.Date, D4_DATA)
            .input("D4_OP", connection_js_1.sql.VarChar, D4_OP)
            .input("D4_PRODUTO", connection_js_1.sql.VarChar, D4_PRODUTO)
            .query(`
        INSERT INTO ReservasProductos 
        (D4_FILIAL, D4_COD, D4_LOCAL, D4_QUANT, D4_QTDEORI, D4_DATA, D4_OP, D4_PRODUTO)
        VALUES (@D4_FILIAL, @D4_COD, @D4_LOCAL, @D4_QUANT, @D4_QTDEORI, @D4_DATA, @D4_OP, @D4_PRODUTO);
        SELECT SCOPE_IDENTITY() AS id
      `);
        res.status(201).json({ msg: "Reserva creada", id: result.recordset[0].id });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.createReserva = createReserva;
// Actualizar una reserva
const updateReserva = async (req, res) => {
    const { id } = req.params;
    const { D4_FILIAL, D4_COD, D4_LOCAL, D4_QUANT, D4_QTDEORI, D4_DATA, D4_OP, D4_PRODUTO } = req.body;
    try {
        const pool = await (0, connection_js_1.getConnection)();
        const result = await pool
            .request()
            .input("ID", connection_js_1.sql.Int, id)
            .input("D4_FILIAL", connection_js_1.sql.VarChar, D4_FILIAL)
            .input("D4_COD", connection_js_1.sql.VarChar, D4_COD)
            .input("D4_LOCAL", connection_js_1.sql.VarChar, D4_LOCAL)
            .input("D4_QUANT", connection_js_1.sql.Decimal(18, 4), D4_QUANT)
            .input("D4_QTDEORI", connection_js_1.sql.Decimal(18, 4), D4_QTDORI)
            .input("D4_DATA", connection_js_1.sql.Date, D4_DATA)
            .input("D4_OP", connection_js_1.sql.VarChar, D4_OP)
            .input("D4_PRODUTO", connection_js_1.sql.VarChar, D4_PRODUTO)
            .query(`
        UPDATE ReservasProductos
        SET D4_FILIAL = @D4_FILIAL,
            D4_COD = @D4_COD,
            D4_LOCAL = @D4_LOCAL,
            D4_QUANT = @D4_QUANT,
            D4_QTDEORI = @D4_QTDEORI,
            D4_DATA = @D4_DATA,
            D4_OP = @D4_OP,
            D4_PRODUTO = @D4_PRODUTO
        WHERE ID = @ID
      `);
        if (result.rowsAffected[0] === 0)
            return res.status(404).json({ msg: "Reserva no encontrada" });
        res.json({ msg: "Reserva actualizada correctamente" });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.updateReserva = updateReserva;
// Eliminar una reserva
const deleteReserva = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await (0, connection_js_1.getConnection)();
        const result = await pool
            .request()
            .input("ID", connection_js_1.sql.Int, id)
            .query("DELETE FROM ReservasProductos WHERE ID = @ID");
        if (result.rowsAffected[0] === 0)
            return res.status(404).json({ msg: "Reserva no encontrada" });
        res.sendStatus(204);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.deleteReserva = deleteReserva;
