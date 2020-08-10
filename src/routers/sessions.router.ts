import { Router } from 'express';

import sessionController from '../controllers/SessionController';

const sessionsRouter = Router();

sessionsRouter.post('/', sessionController.create);

export default sessionsRouter;
