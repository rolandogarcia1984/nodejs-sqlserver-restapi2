import { getPostgresConnection } from "../../database/connection.js";

// Obtener todas las programaciones en estado 2 (PROGRAMADO)
export const getProgramaciones = async (req, res) => {
  try {
    const query = `SELECT "programacionId", ruc, "codPedido", item, "codProducto", cantidad FROM public."Programaciones" WHERE "estadoId" = 2 ORDER BY "createdAt" ASC`;

    const pool = await getPostgresConnection();
    const result = await pool.query(query);
    // console.log(result.rows);
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(error.message);
    // console.log(error);
  }
};