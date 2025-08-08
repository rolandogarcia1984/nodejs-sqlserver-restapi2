import { config } from "dotenv";
config();

export const PORT_MS = process.env.PORT || 4000;
export const DB_USER_MS = process.env.DB_USER || "prodpar";
export const DB_PASSWORD_MS = process.env.DB_PASSWORD || "Dkp*5678$";
export const DB_SERVER_MS = process.env.DB_SERVER || "192.168.40.40\\WINCC";
export const DB_DATABASE_MS = process.env.DB_DATABASE || "AxFertimaxFrontera";
