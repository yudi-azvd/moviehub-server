import { Router } from 'express';

import userController from '../controllers/UserController';
import ensureUserIsAuthenticated from '../middlewares/ensureUserIsAuthenticated';

const usersRouter = Router();

usersRouter.post('/', userController.create);

usersRouter.use(ensureUserIsAuthenticated);

usersRouter.get('/:id', userController.show);

export default usersRouter;
