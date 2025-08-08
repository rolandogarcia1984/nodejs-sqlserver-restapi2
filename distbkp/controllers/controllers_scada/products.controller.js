"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductById = exports.getTotalProducts = exports.deleteProductById = exports.getProductById = exports.createNewProduct = exports.getProducts = void 0;
const connection_js_1 = require("../../database/connection.js");
const getProducts = async (req, res) => {
    try {
        const pool = await (0, connection_js_1.getConnection)();
        const result = await pool.request().query("SELECT * FROM products");
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
exports.getProducts = getProducts;
const createNewProduct = async (req, res) => {
    const { name, description, quantity = 0, price } = req.body;
    if (description == null || name == null) {
        return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
    }
    try {
        const pool = await (0, connection_js_1.getConnection)();
        const result = await pool
            .request()
            .input("name", connection_js_1.sql.VarChar, name)
            .input("description", connection_js_1.sql.Text, description)
            .input("quantity", connection_js_1.sql.Int, quantity)
            .input("price", connection_js_1.sql.Decimal, price)
            .query("INSERT INTO products (name, description, quantity, price) VALUES (@name,@description,@quantity,@price); SELECT SCOPE_IDENTITY() as id");
        res.json({
            name,
            description,
            quantity,
            price,
            id: result.recordset[0].id,
        });
    }
    catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
exports.createNewProduct = createNewProduct;
const getProductById = async (req, res) => {
    try {
        const pool = await (0, connection_js_1.getConnection)();
        const result = await pool
            .request()
            .input("id", req.params.id)
            .query("SELECT * FROM products WHERE id = @id");
        return res.json(result.recordset[0]);
    }
    catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
exports.getProductById = getProductById;
const deleteProductById = async (req, res) => {
    try {
        const pool = await (0, connection_js_1.getConnection)();
        const result = await pool
            .request()
            .input("id", req.params.id)
            .query("DELETE FROM products WHERE id = @id");
        if (result.rowsAffected[0] === 0)
            return res.sendStatus(404);
        return res.sendStatus(204);
    }
    catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
exports.deleteProductById = deleteProductById;
const getTotalProducts = async (req, res) => {
    const pool = await (0, connection_js_1.getConnection)();
    const result = await pool.request().query("SELECT COUNT(*) FROM products");
    res.json(result.recordset[0][""]);
};
exports.getTotalProducts = getTotalProducts;
const updateProductById = async (req, res) => {
    const { description, name, quantity = 0, price } = req.body;
    if (description == null ||
        name == null ||
        quantity == null ||
        price == null) {
        return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
    }
    try {
        const pool = await (0, connection_js_1.getConnection)();
        const result = await pool
            .request()
            .input("id", req.params.id)
            .input("name", connection_js_1.sql.VarChar, name)
            .input("description", connection_js_1.sql.Text, description)
            .input("quantity", connection_js_1.sql.Int, quantity)
            .input("price", connection_js_1.sql.Decimal, price)
            .query("UPDATE products SET name = @name, description = @description, quantity = @quantity, price = @price WHERE id = @id");
        if (result.rowsAffected[0] === 0)
            return res.sendStatus(404);
        res.json({ name, description, quantity, price, id: req.params.id });
    }
    catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
exports.updateProductById = updateProductById;
