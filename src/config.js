import { config } from "dotenv";
config();

export const PORT_MS = process.env.PORT;
export const DB_USER_MS = process.env.DB_USER_MS;
export const DB_PASSWORD_MS = process.env.DB_PASSWORD_MS;
export const DB_SERVER_MS = process.env.DB_SERVER_MS;
export const DB_DATABASE_MS = process.env.DB_DATABASE_MS;
