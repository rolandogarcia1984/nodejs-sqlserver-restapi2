import { getConnection, sql } from "../../database/connection.js";

// Obtener todas las órdenes
export const getAllOrdenes = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT C2_NUM OP , C2_PRODUTO PRODUCTO , C2_QUANT CANTIDAD , C2_QUJE PRODUCIDO , FORMAT(C2_EMISSAO,'dd/MM/yyyy') EMISION   FROM OrdenesProduccion ORDER BY C2_NUM DESC");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Obtener una orden por su número (C2_NUM)
export const getOrdenById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("C2_NUM", sql.VarChar, id)
      .query("SELECT * FROM OrdenesProduccion WHERE C2_NUM = @C2_NUM");

    if (!result.recordset[0]) return res.status(404).json({ msg: "Orden no encontrada" });
    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Crear nueva orden
export const createOrden = async (req, res) => {
  const {
    C2_FILIAL,
    C2_NUM,
    C2_PRODUTO,
    C2_QUANT,
    C2_QUJE,
    C2_EMISSAO,
    C2_DATPRF,
    C2_CC,
  } = req.body;

  if (!C2_NUM || !C2_FILIAL || !C2_PRODUTO || C2_QUANT == null) {
    return res.status(400).json({ msg: "Campos obligatorios faltantes" });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("C2_FILIAL", sql.VarChar, C2_FILIAL)
      .input("C2_NUM", sql.VarChar, C2_NUM)
      .input("C2_PRODUTO", sql.VarChar, C2_PRODUTO)
      .input("C2_QUANT", sql.Decimal(18, 4), C2_QUANT)
      .input("C2_QUJE", sql.Decimal(18, 4), C2_QUJE ?? 0)
      .input("C2_EMISSAO", sql.Date, C2_EMISSAO)
      .input("C2_DATPRF", sql.Date, C2_DATPRF)
      .input("C2_CC", sql.VarChar, C2_CC)
      .query(
        `INSERT INTO OrdenesProduccion 
         (C2_FILIAL, C2_NUM, C2_PRODUTO, C2_QUANT, C2_QUJE, C2_EMISSAO, C2_DATPRF, C2_CC)
         VALUES (@C2_FILIAL, @C2_NUM, @C2_PRODUTO, @C2_QUANT, @C2_QUJE, @C2_EMISSAO, @C2_DATPRF, @C2_CC)`
      );

    res.status(201).json({ msg: "Orden creada exitosamente" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Actualizar una orden existente
export const updateOrden = async (req, res) => {
  const { id } = req.params;
  const {
    C2_FILIAL,
    C2_PRODUTO,
    C2_QUANT,
    C2_QUJE,
    C2_EMISSAO,
    C2_DATPRF,
    C2_CC,
  } = req.body;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("C2_NUM", sql.VarChar, id)
      .input("C2_FILIAL", sql.VarChar, C2_FILIAL)
      .input("C2_PRODUTO", sql.VarChar, C2_PRODUTO)
      .input("C2_QUANT", sql.Decimal(18, 4), C2_QUANT)
      .input("C2_QUJE", sql.Decimal(18, 4), C2_QUJE)
      .input("C2_EMISSAO", sql.Date, C2_EMISSAO)
      .input("C2_DATPRF", sql.Date, C2_DATPRF)
      .input("C2_CC", sql.VarChar, C2_CC)
      .query(
        `UPDATE OrdenesProduccion
         SET C2_FILIAL = @C2_FILIAL, 
             C2_PRODUTO = @C2_PRODUTO, 
             C2_QUANT = @C2_QUANT, 
             C2_QUJE = @C2_QUJE, 
             C2_EMISSAO = @C2_EMISSAO, 
             C2_DATPRF = @C2_DATPRF, 
             C2_CC = @C2_CC
         WHERE C2_NUM = @C2_NUM`
      );

    if (result.rowsAffected[0] === 0)
      return res.status(404).json({ msg: "Orden no encontrada" });

    res.json({ msg: "Orden actualizada correctamente" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Eliminar una orden
export const deleteOrden = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("C2_NUM", sql.VarChar, id)
      .query("DELETE FROM OrdenesProduccion WHERE C2_NUM = @C2_NUM");

    if (result.rowsAffected[0] === 0)
      return res.status(404).json({ msg: "Orden no encontrada" });

    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
export const getOrdenes = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .query("select * from OrdenesProduccion "); 

    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener órdenes de producción." });
  }
};