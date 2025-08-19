// routes/ordenes.routes.js
import { Router } from 'express';
import * as controller from '../../controllers/controllers_ciaweb/programaciones.controller.js';

const router = Router();

router.get('/', controller.getProgramaciones);
router.put('/:programacionId', controller.updateProgramacion);

export default router;
