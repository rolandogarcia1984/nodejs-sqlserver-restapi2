// routes/programaciones.routes.js
import { Router } from 'express';
import * as controller from '../../controllers/controllers_ciaweb/programaciones.controller.js';

const router = Router();

// Obtener programaciones en estado (PROGRAMADO)
router.get('/', controller.getProgramaciones);

// Obtener programaciones filtradas según criterios específicos
router.get('/filtradas', controller.getProgramacionesFiltradas);

// Actualizar a estado (PREPARANDO) o (SOLICITADO)
router.put('/:programacionId', controller.updateProgramacion);

export default router;
