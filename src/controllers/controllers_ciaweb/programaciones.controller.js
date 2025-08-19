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

// Actualiza a estado (PREPARANDO) una programación por su ID
export const updateProgramacion = async (req, res) => {
  const programacionId = parseInt(req.params.programacionId);

  // Se busca la programación por su ID y en estado (PROGRAMADO)
  const query = `SELECT * FROM public."Programaciones" WHERE "programacionId" = $1 AND "estadoId" = 2`;
  const pool = await getPostgresConnection();
  const programacionFound = await pool.query(query, [programacionId]);

  // Si no se encuentra retorna un error 404
  if (programacionFound.rowCount === 0) {
    return res.status(404).json({ error: "Programación estado (PROGRAMADO) no encontrada" });
  }

  // Si se encuentra se actualiza el estado a 3 (PREPARANDO)
  try {
    const query = `UPDATE public."Programaciones" SET "estadoId" = $1 WHERE "programacionId" = $2`;
    const pool = await getPostgresConnection();
    const result = await pool.query(query, [3, programacionId]);

    res.json({ message: "Programación actualizada exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la programación" });
  }
}