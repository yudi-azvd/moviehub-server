import { Router } from 'express';

import ensureUserIsAuthenticated from '../middlewares/ensureUserIsAuthenticated';
import UserController from '../controllers/UserController';

const usersRouter = Router();

const userController = new UserController();

usersRouter.post('/', userController.create);

usersRouter.use(ensureUserIsAuthenticated);

usersRouter.get('/:id', userController.show);

/**

usersRouter.get('/:user_id/favorite_movies', userFavoriteMovies.list);

usersRouter.post('/:user_id/favorite_movies/:movie_id', userFavoriteMovies.create);

usersRouter.delete('/:user_id/favorite_movies/:movie_id', userFavoriteMovies.delete);

*/

export default usersRouter;
