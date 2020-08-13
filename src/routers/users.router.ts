import { Router } from 'express';

import ensureUserIsAuthenticated from '../middlewares/ensureUserIsAuthenticated';
import UserController from '../controllers/UserController';

const usersRouter = Router();

const userController = new UserController();

usersRouter.post('/', userController.create);

usersRouter.use(ensureUserIsAuthenticated);

usersRouter.get('/:id', userController.show);

export default usersRouter;
