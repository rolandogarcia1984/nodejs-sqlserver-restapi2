// routes/ordenes.routes.js
import { Router } from 'express';
import * as controller from '../controllers/controllers_scada/ordenes.controller.js';

const router = Router();

router.get('/', controller.getAllOrdenes);
router.get('/:id', controller.getOrdenById);
router.post('/', controller.createOrden);
router.put('/:id', controller.updateOrden);
router.delete('/:id', controller.deleteOrden);


// ✅ Export por defecto compatible con `import ordenesRoutes from ...`
export default router;
