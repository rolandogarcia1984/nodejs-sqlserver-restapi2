import { getConnection, sql } from "../database/connection.js";

export const getOrdenes = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT TOP 20 * FROM ordenesproduccion");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener órdenes", error });
  }
};

export const getProducciones = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT TOP 20 * FROM reservasproduccion");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener producciones", error });
  }
};

export const getRecetas = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT TOP 20 * FROM reservasproductos");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reservas de productos", error });
  }
};

export const getProductos = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT TOP 20 * FROM productos");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
};
