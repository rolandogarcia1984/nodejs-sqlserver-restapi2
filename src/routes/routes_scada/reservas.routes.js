 // routes/reservas.routes.js
import { Router } from 'express';
import * as controller from '../../controllers/controllers_scada/reservas.controller.js';

const router = Router();

router.get('/', controller.getAllReservas);
router.get('/:id', controller.getReservaByOp);
router.post('/', controller.createReserva);
router.put('/:id', controller.updateReserva);
router.delete('/:id', controller.deleteReserva);

// Export por defecto
export default router;
 