import { config } from "dotenv";
config();

export const PORT_MS = process.env.PORT || 3000;
export const DB_USER_MS = process.env.DB_USER || "sa";
export const DB_PASSWORD_MS = process.env.DB_PASSWORD || "123";
export const DB_SERVER_MS = process.env.DB_SERVER || "ROLANDOGARCIA-N\\SQLEXPRESS";
export const DB_DATABASE_MS = process.env.DB_DATABASE || "scada";
