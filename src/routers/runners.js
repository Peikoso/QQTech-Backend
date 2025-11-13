import express from 'express';
import { RunnersController, RunnerLogsController } from '../controllers/runners.js';

const router = express.Router();

router.get('/', RunnersController.getAllRunners);
router.post('/', RunnersController.createRunner);

router.get('/logs', RunnerLogsController.getAllRunnersLogs);
router.post('/logs', RunnerLogsController.createRunnerLog);

export default router;