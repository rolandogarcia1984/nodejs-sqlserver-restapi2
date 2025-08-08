"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activarInactivarProducto = exports.deleteProducto = exports.updateProducto = exports.createProducto = exports.getProductoByCodigo = exports.getAllProductos = void 0;
const connection_js_1 = require("../../database/connection.js");
// Obtener todos los productos
const getAllProductos = async (req, res) => {
    try {
        const pool = await (0, connection_js_1.getConnection)();
        const result = await pool.request().query("SELECT B1_COD CODIGO , B1_DESC DESCRIPCION , B1_TIPO TIPO , B1_UM UNIDAD  FROM Productos");
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getAllProductos = getAllProductos;
// Obtener un producto por código
const getProductoByCodigo = async (req, res) => {
    const { codigo } = req.params;
    try {
        const pool = await (0, connection_js_1.getConnection)();
        const result = await pool
            .request()
            .input("B1_COD", connection_js_1.sql.VarChar, codigo)
            .query("SELECT * FROM Productos WHERE B1_COD = @B1_COD");
        if (!result.recordset[0])
            return res.status(404).json({ msg: "Producto no encontrado" });
        res.json(result.recordset[0]);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getProductoByCodigo = getProductoByCodigo;
const createProducto = async (req, res) => {
    const { B1_COD, B1_DESC, B1_UM, B1_GRUPO, B1_TIPO, B1_POSIPI, B1_CODBAR } = req.body;
    console.log('Este es el body', req.body);
    if (!B1_COD || !B1_DESC) {
        return res.status(400).json({ msg: "B1_COD y B1_DESC son obligatorios" });
    }
    try {
        const pool = await (0, connection_js_1.getConnection)();
        await pool.request()
            .input("B1_COD", connection_js_1.sql.VarChar, B1_COD)
            .input("B1_DESC", connection_js_1.sql.VarChar, B1_DESC)
            .input("B1_UM", connection_js_1.sql.VarChar, B1_UM)
            .input("B1_GRUPO", connection_js_1.sql.VarChar, B1_GRUPO)
            .input("B1_TIPO", connection_js_1.sql.VarChar, B1_TIPO)
            .input("B1_POSIPI", connection_js_1.sql.VarChar, B1_POSIPI)
            .input("B1_CODBAR", connection_js_1.sql.VarChar, B1_CODBAR)
            .query(`
        INSERT INTO Productos (B1_COD, B1_DESC, B1_UM, B1_GRUPO, B1_TIPO, B1_POSIPI, B1_CODBAR)
        VALUES (@B1_COD, @B1_DESC, @B1_UM, @B1_GRUPO, @B1_TIPO, @B1_POSIPI, @B1_CODBAR)
      `);
        res.status(201).json({ msg: "Producto creado" });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.createProducto = createProducto;
// Actualizar un producto
const updateProducto = async (req, res) => {
    const { codigo } = req.params;
    const { B1_DESC, B1_UM, B1_GRUPO, B1_TIPO, B1_POSIPI, B1_CODBAR } = req.body;
    try {
        const pool = await (0, connection_js_1.getConnection)();
        const result = await pool.request()
            .input("B1_COD", connection_js_1.sql.VarChar, codigo)
            .input("B1_DESC", connection_js_1.sql.VarChar, B1_DESC)
            .input("B1_UM", connection_js_1.sql.VarChar, B1_UM)
            .input("B1_GRUPO", connection_js_1.sql.VarChar, B1_GRUPO)
            .input("B1_TIPO", connection_js_1.sql.VarChar, B1_TIPO)
            .input("B1_POSIPI", connection_js_1.sql.VarChar, B1_POSIPI)
            .input("B1_CODBAR", connection_js_1.sql.VarChar, B1_CODBAR)
            .query(`
        UPDATE Productos
        SET B1_DESC = @B1_DESC,
            B1_UM = @B1_UM,
            B1_GRUPO = @B1_GRUPO,
            B1_TIPO = @B1_TIPO,
            B1_POSIPI = @B1_POSIPI,
            B1_CODBAR = @B1_CODBAR
        WHERE B1_COD = @B1_COD
      `);
        if (result.rowsAffected[0] === 0)
            return res.status(404).json({ msg: "Producto no encontrado" });
        res.json({ msg: "Producto actualizado correctamente" });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.updateProducto = updateProducto;
// Eliminar un producto
const deleteProducto = async (req, res) => {
    const { codigo } = req.params;
    try {
        const pool = await (0, connection_js_1.getConnection)();
        const result = await pool.request()
            .input("B1_COD", connection_js_1.sql.VarChar, codigo)
            .query("DELETE FROM Productos WHERE B1_COD = @B1_COD");
        if (result.rowsAffected[0] === 0)
            return res.status(404).json({ msg: "Producto no encontrado" });
        res.sendStatus(204);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.deleteProducto = deleteProducto;
// Activar/Inactivar un producto
const activarInactivarProducto = async (req, res) => {
    const { codigo } = req.params;
    try {
        const pool = await (0, connection_js_1.getConnection)();
        // Primero obtenemos el valor actual de B1_POSIPI
        const producto = await pool.request()
            .input("B1_COD", connection_js_1.sql.VarChar, codigo)
            .query("SELECT B1_POSIPI FROM Productos WHERE B1_COD = @B1_COD");
        if (!producto.recordset[0])
            return res.status(404).json({ msg: "Producto no encontrado" });
        const estadoActual = producto.recordset[0].B1_POSIPI;
        const nuevoEstado = estadoActual === 1 ? '0' : '1';
        const result = await pool.request()
            .input("B1_COD", connection_js_1.sql.VarChar, codigo)
            .input("B1_POSIPI", connection_js_1.sql.VarChar, nuevoEstado)
            .query("UPDATE Productos SET B1_POSIPI = @B1_POSIPI WHERE B1_COD = @B1_COD");
        if (result.rowsAffected[0] === 0)
            return res.status(404).json({ msg: "Producto no encontrado" });
        res.json({ msg: `Producto ${nuevoEstado === 1 ? "activado" : "inactivado"} correctamente` });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.activarInactivarProducto = activarInactivarProducto;
