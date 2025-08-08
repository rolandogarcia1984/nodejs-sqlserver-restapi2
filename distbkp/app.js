"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const productos_routes_js_1 = __importDefault(require("./routes/routes_scada/productos.routes.js"));
const ordenes_routes_js_1 = __importDefault(require("./routes/routes_scada/ordenes.routes.js"));
const reservas_routes_js_1 = __importDefault(require("./routes/routes_scada/reservas.routes.js"));
const authRoutes_js_1 = __importDefault(require("./routes/routes_scada/authRoutes.js")); // Importa las rutas de autenticación
const dashboard_routes_js_1 = __importDefault(require("./routes/routes_scada/dashboard.routes.js"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
// Routes
app.use("/api/productos", productos_routes_js_1.default);
app.use("/api/ordenes", ordenes_routes_js_1.default);
app.use("/api/reservas", reservas_routes_js_1.default);
app.use("/api", authRoutes_js_1.default); // Usa las rutas de autenticación
app.use("/api", dashboard_routes_js_1.default);
// Configura la carpeta pública para servir archivos estáticos
app.use(express_1.default.static("public"));
exports.default = app;
