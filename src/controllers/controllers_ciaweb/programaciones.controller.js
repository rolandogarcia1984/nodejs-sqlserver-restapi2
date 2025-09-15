import { getPostgresConnection } from "../../database/connection.js";

// Obtener todas las programaciones en estado 1 (SOLICITADO)
export const getProgramaciones = async (req, res) => {
  try {
    const query = `SELECT "programacionId", "tipoEntrega", ruc, "codPedido", item, "codProducto", cantidad FROM public."Programaciones" WHERE "estadoId" = 1 ORDER BY "createdAt" ASC`;

    const pool = await getPostgresConnection();
    const result = await pool.query(query);
    // console.log(result.rows);
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(error.message);
    // console.log(error);
  }
};


// Obtener programaciones filtradas según criterios específicos:
// Estado 1 (SOLICITADO)
export const getProgramacionesFiltradas = async (req, res) => {
  try {
    const query = `
      SELECT 
        "programacionId", 
        "tipoEntrega", 
        ruc, 
        "codPedido", 
        item, 
        "codProducto", 
        cantidad,
        "estadoId",
        "createdAt"
      FROM public."Programaciones" 
      WHERE "estadoId" = 1
      ORDER BY "createdAt" DESC, "programacionId" DESC
    `;

    const pool = await getPostgresConnection();
    const result = await pool.query(query);
    
    // Agregar descripción del estado
    const programacionesConEstado = result.rows.map(row => ({
      ...row,
      estadoDescripcion: getEstadoDescripcion(row.estadoId)
    }));

    res.json(programacionesConEstado);
  } catch (error) {
    console.error("Error en getProgramacionesFiltradas:", error);
    res.status(500).json({ error: "Error al obtener programaciones filtradas" });
  }
};

// Función helper para obtener descripción del estado
function getEstadoDescripcion(estadoId) {
  switch(parseInt(estadoId)) {
    case 1: return "SOLICITADO";
    case 10: return "VALIDADO";
    case 2: return "PROGRAMADO";
    case 3: return "PREPARANDO";
    case 4: return "REMITIDO";
    case 5: return "ENTREGADO";
    case 6: return "CANCELADO";
    default: return "DESCONOCIDO";
  }
}


// Actualiza a estado (VALIDADO) una programación por su ID
export const updateProgramacion = async (req, res) => {
  const programacionId = parseInt(req.params.programacionId);

  // Se busca la programación por su ID y en estado (SOLICITADO)
  const query = `SELECT * FROM public."Programaciones" WHERE "programacionId" = $1 AND "estadoId" = 1`;
  const pool = await getPostgresConnection();
  const programaciones = await pool.query(query, [programacionId]);

  // Si no se encuentra retorna un error 404
  if (programaciones.rowCount === 0) {
    return res.status(404).json({ error: "Programación estado (SOLICITADO) no encontrada" });
  }

  // Si se encuentra se actualiza el estado a 10 (VALIDADO).
  try {
    const programacionFound = programaciones.rows[0];
    const estadoValidado = 10;
    const query = `UPDATE public."Programaciones" SET "estadoId" = $1, "validadoFluig" = true WHERE "programacionId" = $2`;
    const pool = await getPostgresConnection();
    const result = await pool.query(query, [estadoValidado, programacionId]);

    // Insertar registro de auditoria en tabla "AuditoriasPE"
    const queryAuditoria = `INSERT INTO public."AuditoriasPE"("campoModificado", "valorAnterior", "valorActual", "usuarioResponsable", "programacionId", "createdAt", "updatedAt")
	VALUES ('estadoId','${programacionFound.estadoId}','${estadoValidado}','fluig', ${programacionId}, CURRENT_DATE, CURRENT_DATE)`;
    const resultAuditoria = await pool.query(queryAuditoria);
    
    // Respuesta
    res.json({ message: "Programación actualizada exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la programación" });
  }
}