import { getConnection, sql } from "../../database/connection.js";

// Obtener todos los productos
export const getAllProductos = async (req, res) => {
  try {
    const pool = await getConnection();
    // console.log(pool)
    const result = await pool.request().query("SELECT B1_COD CODIGO , B1_DESC DESCRIPCION , B1_TIPO TIPO , B1_UM UNIDAD  FROM Productos");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
    // console.log(error);
    
  }
};

// Obtener un producto por código
export const getProductoByCodigo = async (req, res) => {
  const { codigo } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("B1_COD", sql.VarChar, codigo )
      .query("SELECT * FROM Productos WHERE B1_COD =  @B1_COD ");

    if (!result.recordset[0])
      return res.status(404).json({ msg: "Producto no encontrado" });

    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createProducto = async (req, res) => {
  const {
    B1_COD,
    B1_DESC,
    B1_UM,
    B1_GRUPO,
    B1_TIPO,
    B1_POSIPI,
    B1_CODBAR,
    B1_PL1,
    B1_PL2,
    B1_PL3,
    B1_PL4
  } = req.body;
 
  if (!B1_COD || !B1_DESC) {
    return res.status(400).json({ msg: "B1_COD y B1_DESC son obligatorios" });
  }

  try {
    const pool = await getConnection();
    await pool.request()
      .input("B1_COD", sql.VarChar, B1_COD)
      .input("B1_DESC", sql.VarChar, B1_DESC)
      .input("B1_UM", sql.VarChar, B1_UM)
      .input("B1_GRUPO", sql.VarChar, B1_GRUPO)
      .input("B1_TIPO", sql.VarChar, B1_TIPO)
      .input("B1_POSIPI", sql.VarChar, B1_POSIPI)
      .input("B1_CODBAR", sql.VarChar, B1_CODBAR)
      .input("B1_PL1", sql.VarChar, B1_PL1)
      .input("B1_PL2", sql.VarChar, B1_PL2)
      .input("B1_PL3", sql.VarChar, B1_PL3)
      .input("B1_PL4", sql.VarChar, B1_PL4)
      .query(`
        INSERT INTO Productos (B1_COD, B1_DESC, B1_UM, B1_GRUPO, B1_TIPO, B1_POSIPI, B1_CODBAR, B1_PL1, B1_PL2, B1_PL3, B1_PL4)
        VALUES (@B1_COD, @B1_DESC, @B1_UM, @B1_GRUPO, @B1_TIPO, @B1_POSIPI, @B1_CODBAR, @B1_PL1, @B1_PL2, @B1_PL3, @B1_PL4)
      `);

    res.status(201).json({ msg: "Producto creado" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Actualizar un producto
export const updateProducto = async (req, res) => {
  const { codigo } = req.params;
  const {
    B1_DESC,
    B1_UM,
    B1_GRUPO,
    B1_TIPO,
    B1_POSIPI,
    B1_CODBAR,
    B1_PL1,
    B1_PL2,
    B1_PL3,
    B1_PL4
  } = req.body;

  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input("B1_COD", sql.VarChar, codigo)
      .input("B1_DESC", sql.VarChar, B1_DESC)
      .input("B1_UM", sql.VarChar, B1_UM)
      .input("B1_GRUPO", sql.VarChar, B1_GRUPO)
      .input("B1_TIPO", sql.VarChar, B1_TIPO)
      .input("B1_POSIPI", sql.VarChar, B1_POSIPI)
      .input("B1_CODBAR", sql.VarChar, B1_CODBAR)
      .input("B1_PL1", sql.VarChar, B1_PL1)
      .input("B1_PL2", sql.VarChar, B1_PL2)
      .input("B1_PL3", sql.VarChar, B1_PL3)
      .input("B1_PL4", sql.VarChar, B1_PL4)
      .query(`
        UPDATE Productos
        SET B1_DESC = @B1_DESC,
            B1_UM = @B1_UM,
            B1_GRUPO = @B1_GRUPO,
            B1_TIPO = @B1_TIPO,
            B1_POSIPI = @B1_POSIPI,
            B1_CODBAR = @B1_CODBAR,
            B1_PL1 = @B1_PL1,
            B1_PL2 = @B1_PL2,
            B1_PL3 = @B1_PL3,
            B1_PL4 = @B1_PL4
        WHERE B1_COD = @B1_COD
      `);

    if (result.rowsAffected[0] === 0)
      return res.status(404).json({ msg: "Producto no encontrado" });

    res.json({ msg: "Producto actualizado correctamente" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Eliminar un producto
export const deleteProducto = async (req, res) => {
  const { codigo } = req.params;

  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input("B1_COD", sql.VarChar, codigo)
      .query("DELETE FROM Productos WHERE B1_COD = @B1_COD");

    if (result.rowsAffected[0] === 0)
      return res.status(404).json({ msg: "Producto no encontrado" });

    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Activar/Inactivar un producto
export const activarInactivarProducto = async (req, res) => {
  const { codigo } = req.params;

  try {
    const pool = await getConnection();
    // Primero obtenemos el valor actual de B1_POSIPI
    const producto = await pool.request()
      .input("B1_COD", sql.VarChar, codigo)
      .query("SELECT B1_POSIPI FROM Productos WHERE B1_COD = @B1_COD");

    if (!producto.recordset[0])
      return res.status(404).json({ msg: "Producto no encontrado" });

    const estadoActual = producto.recordset[0].B1_POSIPI;
    const nuevoEstado = estadoActual === 1 ? '0' : '1';

    const result = await pool.request()
      .input("B1_COD", sql.VarChar, codigo)
      .input("B1_POSIPI", sql.VarChar, nuevoEstado)
      .query("UPDATE Productos SET B1_POSIPI = @B1_POSIPI WHERE B1_COD = @B1_COD");

    if (result.rowsAffected[0] === 0)
      return res.status(404).json({ msg: "Producto no encontrado" });

    res.json({ msg: `Producto ${nuevoEstado === 1 ? "activado" : "inactivado"} correctamente` });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
