// routes/ordenes.routes.js
import { Router } from 'express';
import * as controller from '../../controllers/controllers_ciaweb/programaciones.controller.js';

const router = Router();

// Obtener programaciones en estado (PROGRAMADO) o (SOLICITADO)
router.get('/', controller.getProgramaciones);

// Actualizar a estado (PREPARANDO) o (SOLICITADO)
router.put('/:programacionId', controller.updateProgramacion);

export default router;
