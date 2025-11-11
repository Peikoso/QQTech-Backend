import express  from 'express';

import rulesRouter from './rules.js';
import usersRouter from './users.js';
import rolesRouter from './roles.js';
import incidentsRouter from './incidents.js'

const router = express.Router();

router.use('/rules', rulesRouter);
router.use('/users', usersRouter);
router.use('/roles', rolesRouter);
router.use('/incidents', incidentsRouter);

export default router;
