import sql from "mssql";
import {
  DB_DATABASE_MS,
  DB_PASSWORD_MS,
  DB_SERVER_MS,
  DB_USER_MS,
} from "../config.js";

import pkg from "pg";
const { Pool } = pkg;

export const dbSettings = {
  user: DB_USER_MS,
  password: DB_PASSWORD_MS,
  server: DB_SERVER_MS,
  database: DB_DATABASE_MS,
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

export const getConnection = async () => {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.error(error);
  }
};

// sql.connect(dbSettings)
//    .then(() => console.log('✅ Conexión MSSQL OK'))
//    .catch(err => console.error('❌ Error MSSQL:', err));

// PostgreSQL
export const postgres = {
  database: process.env.DB_DATABASE_PG,
  username: process.env.DB_USER_PG,
  password: process.env.DB_PASSWORD_PG,
  params: {
    dialect: "postgres",
    host: process.env.DB_SERVER_PG,
    port: process.env.DB_PORT_PG,
  },
};

// PostgreSQL
export const getPostgresConnection = async () => {
  try {
    const pool = new Pool({
      user: postgres.username,
      host: postgres.params.host,
      database: postgres.database,
      password: postgres.password,
      port: postgres.params.port,
    });

    // Verificar conexión
    const client = await pool.connect();
    console.log("✅ Conectado a Ciaweb - PostgreSQL");
    client.release();

    return pool;
  } catch (error) {
    console.error("❌ Error de conexión a PostgreSQL:", error);
  }
};

export { sql };
