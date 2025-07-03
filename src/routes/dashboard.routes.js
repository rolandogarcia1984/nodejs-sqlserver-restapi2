// routes/dashboard.routes.js
import { Router } from "express";
import { validarJWT } from "../middlewares/jwt.js";
import {
  getOrdenes,
  getProducciones,
  getRecetas,
  getProductos,
} from "../controllers/controllers_scada/dashboard.controller.js";

const router = Router();

router.get("/ordenes", validarJWT, getOrdenes);
router.get("/producciones", validarJWT, getProducciones);
router.get("/recetas", validarJWT, getRecetas);
router.get("/productos", validarJWT, getProductos);

export default router;
