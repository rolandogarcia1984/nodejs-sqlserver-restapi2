import { Router } from "express";
 import * as controller from '../controllers/productos.controller.js';
 const router = Router();
 router.post('/', controller.createProducto);
router.get('/', controller.getAllProductos);
router.get('/:codigo', controller.getProductoByCodigo);
router.put('/:codigo', controller.updateProducto);
router.post('/:codigo', controller.activarInactivarProducto);
router.delete('/:codigo', controller.deleteProducto);

export default router;
