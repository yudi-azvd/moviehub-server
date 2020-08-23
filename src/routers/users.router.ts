import { Router } from 'express';

import UserFavoriteMoviesController from '../controllers/UserFavoriteMoviesController';
import ensureUserIsAuthenticated from '../middlewares/ensureUserIsAuthenticated';
import UserController from '../controllers/UserController';

const usersRouter = Router();

const userController = new UserController();
const userFavoriteMoviesController = new UserFavoriteMoviesController();

usersRouter.post('/', userController.create);

usersRouter.use(ensureUserIsAuthenticated);

usersRouter.get('/:id', userController.show);

usersRouter.post(
  '/:user_id/favorite_movies/',
  userFavoriteMoviesController.create,
);

usersRouter.delete(
  '/:user_id/favorite_movies/',
  userFavoriteMoviesController.delete,
);

/**
 ////// IDEIA
 Uma entidade:
 class UserFavoriteMovies {
   user_id: number;

   favoriteMovies: Movie[];
  }

Essa é pra abordagem em que favoriteMovies tem um pouco mais de
independencia em relação a user.
usersRouter.get('/:user_id/favorite_movies', userFavoriteMoviesController.list); ???

*/

export default usersRouter;
