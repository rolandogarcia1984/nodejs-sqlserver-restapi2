"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sql = exports.getConnection = exports.dbSettings = void 0;
const mssql_1 = __importDefault(require("mssql"));
exports.sql = mssql_1.default;
const config_js_1 = require("../config.js");
exports.dbSettings = {
    user: config_js_1.DB_USER_MS,
    password: config_js_1.DB_PASSWORD_MS,
    server: config_js_1.DB_SERVER_MS,
    database: config_js_1.DB_DATABASE_MS,
    options: {
        encrypt: false, // for azure
        trustServerCertificate: true, // change to true for local dev / self-signed certs
    },
};
const getConnection = async () => {
    try {
        const pool = await mssql_1.default.connect(exports.dbSettings);
        return pool;
    }
    catch (error) {
        console.error(error);
    }
};
exports.getConnection = getConnection;
