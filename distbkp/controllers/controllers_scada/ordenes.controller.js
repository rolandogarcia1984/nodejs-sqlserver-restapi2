"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdenes = exports.deleteOrden = exports.updateOrden = exports.createOrden = exports.getOrdenById = exports.getAllOrdenes = void 0;
const connection_js_1 = require("../../database/connection.js");
// Obtener todas las órdenes
const getAllOrdenes = async (req, res) => {
    try {
        const pool = await (0, connection_js_1.getConnection)();
        const result = await pool.request().query("SELECT C2_NUM OP , C2_PRODUTO PRODUCTO , C2_QUANT CANTIDAD , C2_QUJE PRODUCIDO , FORMAT(C2_EMISSAO,'dd/MM/yyyy') EMISION   FROM OrdenesProduccion ORDER BY C2_NUM DESC");
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getAllOrdenes = getAllOrdenes;
// Obtener una orden por su número (C2_NUM)
const getOrdenById = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await (0, connection_js_1.getConnection)();
        const result = await pool
            .request()
            .input("C2_NUM", connection_js_1.sql.VarChar, id)
            .query("SELECT * FROM OrdenesProduccion WHERE C2_NUM = @C2_NUM");
        if (!result.recordset[0])
            return res.status(404).json({ msg: "Orden no encontrada" });
        res.json(result.recordset[0]);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getOrdenById = getOrdenById;
// Crear nueva orden
const createOrden = async (req, res) => {
    const { C2_FILIAL, C2_NUM, C2_PRODUTO, C2_QUANT, C2_QUJE, C2_EMISSAO, C2_DATPRF, C2_CC, } = req.body;
    if (!C2_NUM || !C2_FILIAL || !C2_PRODUTO || C2_QUANT == null) {
        return res.status(400).json({ msg: "Campos obligatorios faltantes" });
    }
    try {
        const pool = await (0, connection_js_1.getConnection)();
        await pool
            .request()
            .input("C2_FILIAL", connection_js_1.sql.VarChar, C2_FILIAL)
            .input("C2_NUM", connection_js_1.sql.VarChar, C2_NUM)
            .input("C2_PRODUTO", connection_js_1.sql.VarChar, C2_PRODUTO)
            .input("C2_QUANT", connection_js_1.sql.Decimal(18, 4), C2_QUANT)
            .input("C2_QUJE", connection_js_1.sql.Decimal(18, 4), C2_QUJE ?? 0)
            .input("C2_EMISSAO", connection_js_1.sql.Date, C2_EMISSAO)
            .input("C2_DATPRF", connection_js_1.sql.Date, C2_DATPRF)
            .input("C2_CC", connection_js_1.sql.VarChar, C2_CC)
            .query(`INSERT INTO OrdenesProduccion 
         (C2_FILIAL, C2_NUM, C2_PRODUTO, C2_QUANT, C2_QUJE, C2_EMISSAO, C2_DATPRF, C2_CC)
         VALUES (@C2_FILIAL, @C2_NUM, @C2_PRODUTO, @C2_QUANT, @C2_QUJE, @C2_EMISSAO, @C2_DATPRF, @C2_CC)`);
        res.status(201).json({ msg: "Orden creada exitosamente" });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.createOrden = createOrden;
// Actualizar una orden existente
const updateOrden = async (req, res) => {
    const { id } = req.params;
    const { C2_FILIAL, C2_PRODUTO, C2_QUANT, C2_QUJE, C2_EMISSAO, C2_DATPRF, C2_CC, } = req.body;
    try {
        const pool = await (0, connection_js_1.getConnection)();
        const result = await pool
            .request()
            .input("C2_NUM", connection_js_1.sql.VarChar, id)
            .input("C2_FILIAL", connection_js_1.sql.VarChar, C2_FILIAL)
            .input("C2_PRODUTO", connection_js_1.sql.VarChar, C2_PRODUTO)
            .input("C2_QUANT", connection_js_1.sql.Decimal(18, 4), C2_QUANT)
            .input("C2_QUJE", connection_js_1.sql.Decimal(18, 4), C2_QUJE)
            .input("C2_EMISSAO", connection_js_1.sql.Date, C2_EMISSAO)
            .input("C2_DATPRF", connection_js_1.sql.Date, C2_DATPRF)
            .input("C2_CC", connection_js_1.sql.VarChar, C2_CC)
            .query(`UPDATE OrdenesProduccion
         SET C2_FILIAL = @C2_FILIAL, 
             C2_PRODUTO = @C2_PRODUTO, 
             C2_QUANT = @C2_QUANT, 
             C2_QUJE = @C2_QUJE, 
             C2_EMISSAO = @C2_EMISSAO, 
             C2_DATPRF = @C2_DATPRF, 
             C2_CC = @C2_CC
         WHERE C2_NUM = @C2_NUM`);
        if (result.rowsAffected[0] === 0)
            return res.status(404).json({ msg: "Orden no encontrada" });
        res.json({ msg: "Orden actualizada correctamente" });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.updateOrden = updateOrden;
// Eliminar una orden
const deleteOrden = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await (0, connection_js_1.getConnection)();
        const result = await pool
            .request()
            .input("C2_NUM", connection_js_1.sql.VarChar, id)
            .query("DELETE FROM OrdenesProduccion WHERE C2_NUM = @C2_NUM");
        if (result.rowsAffected[0] === 0)
            return res.status(404).json({ msg: "Orden no encontrada" });
        res.sendStatus(204);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.deleteOrden = deleteOrden;
const getOrdenes = async (req, res) => {
    try {
        const pool = await (0, connection_js_1.getConnection)();
        const result = await pool.request()
            .query("select * from OrdenesProduccion ");
        res.json(result.recordset);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener órdenes de producción." });
    }
};
exports.getOrdenes = getOrdenes;
