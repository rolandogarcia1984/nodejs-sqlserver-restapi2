"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = __importDefault(require("./app.js"));
const config_js_1 = require("./config.js");
app_js_1.default.listen(config_js_1.PORT_MS);
console.log("Server on port", config_js_1.PORT_MS);
