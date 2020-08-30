import { Request, Response } from 'express';

import AppError from '../errors/AppError';

import UserFavoriteMoviesRepository from '../repositories/UserFavoriteMoviesRepository';
import MoviesRepository from '../repositories/MoviesRepository';
import UsersRepository from '../repositories/UsersRepository';

class UserFavoriteMoviesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { user_id: userId } = request.params;
    const user_id = parseInt(userId, 10);

    const usersRepository = new UsersRepository();
    const userFavoriteMoviesRepository = new UserFavoriteMoviesRepository();

    const existingUser = await usersRepository.findById(user_id);
    if (!existingUser) {
      throw new AppError(`User with id ${user_id} does not exist`, 404);
    }

    const favoriteMovies = await userFavoriteMoviesRepository.findUserFavoriteMovies(
      user_id,
    );

    return response.json(favoriteMovies);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { user_id: userId } = request.params;
    const user_id = parseInt(userId, 10);
    const { movie_id } = request.body;

    const usersRepository = new UsersRepository();
    const moviesRepository = new MoviesRepository();
    const userFavoriteMoviesRepository = new UserFavoriteMoviesRepository();

    const existingUser = await usersRepository.findById(user_id);
    if (!existingUser) {
      throw new AppError(`User with id ${user_id} does not exist`, 404);
    }

    const existingMovie = await moviesRepository.findById(movie_id);
    if (!existingMovie) {
      throw new AppError(`Movie with id ${user_id} does not exist`, 404);
    }

    const userAndMovie = await userFavoriteMoviesRepository.findUserHasThisFavoriteMovie(
      user_id,
      movie_id,
    );

    if (userAndMovie) {
      throw new AppError('User already has this movie as their favorite', 403);
    }

    const userHasFavoriteMovie = await userFavoriteMoviesRepository.create(
      existingUser.id,
      existingMovie.id,
    );

    return response.json(userHasFavoriteMovie);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { user_id: userId } = request.params;
    const user_id = parseInt(userId, 10);
    const { movie_id } = request.body;

    const usersRepository = new UsersRepository();
    const moviesRepository = new MoviesRepository();
    const userFavoriteMoviesRepository = new UserFavoriteMoviesRepository();

    const existingUser = await usersRepository.findById(user_id);
    if (!existingUser) {
      throw new AppError(`User with id ${user_id} does not exist`, 404);
    }

    const existingMovie = await moviesRepository.findById(movie_id);
    if (!existingMovie) {
      throw new AppError(`Movie with id ${user_id} does not exist`, 404);
    }

    await userFavoriteMoviesRepository.deleteUserFavoriteMovie(
      user_id,
      movie_id,
    );

    return response.json({ deleted: true });
  }
}

export default UserFavoriteMoviesController;
