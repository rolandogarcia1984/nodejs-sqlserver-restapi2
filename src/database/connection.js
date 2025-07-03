import sql from "mssql";
import { DB_DATABASE_MS, DB_PASSWORD_MS, DB_SERVER_MS, DB_USER_MS } from "../config.js";

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

export { sql };
