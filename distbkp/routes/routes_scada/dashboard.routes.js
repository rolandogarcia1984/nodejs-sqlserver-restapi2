"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/dashboard.routes.js
const express_1 = require("express");
const jwt_js_1 = require("../../middlewares/jwt.js");
const dashboard_controller_js_1 = require("../../controllers/controllers_scada/dashboard.controller.js");
const router = (0, express_1.Router)();
router.get("/ordenes", jwt_js_1.validarJWT, dashboard_controller_js_1.getOrdenes);
router.get("/producciones", jwt_js_1.validarJWT, dashboard_controller_js_1.getProducciones);
router.get("/recetas", jwt_js_1.validarJWT, dashboard_controller_js_1.getRecetas);
router.get("/productos", jwt_js_1.validarJWT, dashboard_controller_js_1.getProductos);
exports.default = router;
