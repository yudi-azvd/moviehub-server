import { AxiosInstance } from 'axios';
import { getManager } from 'typeorm';

import createAxiosInstance from '../api';

import Movie from '../models/Movie';
import UserHasFavoriteMovie from '../models/UserHasFavoriteMovie';

class UserFavoriteMoviesRepository {
  private moviesApi: AxiosInstance;

  constructor() {
    this.moviesApi = createAxiosInstance();
    this.moviesApi.defaults.baseURL += '/movie';
  }

  public async findUserFavoriteMovies(user_id: number): Promise<Movie[]> {
    const userAndMovies = await getManager()
      .createQueryBuilder(UserHasFavoriteMovie, 'user_favorite_movie')
      .where('user_favorite_movie.user_id = :user_id', { user_id })
      .getMany();

    const responsesPromises: Promise<AxiosResponse<APIMovie>>[] = [];

    // userAndFavoriteMovieIds não é um typo!
    userAndMovies.forEach(userAndFavoriteMovieIds => {
      const { movie_id } = userAndFavoriteMovieIds;

      responsesPromises.push(this.moviesApi.get(`${movie_id}`));
    });

    const responses = await Promise.all(responsesPromises);

    const movies = responses
      .map(response => response.data)
      .map(apiMovie => new Movie(apiMovie));

    return movies;
  }

  public async create(
    user_id: number,
    movie_id: number,
  ): Promise<UserHasFavoriteMovie> {
    await getManager()
      .createQueryBuilder()
      .insert()
      .into(UserHasFavoriteMovie)
      .values([{ user_id, movie_id }])
      .execute();

    const userAndMovie = new UserHasFavoriteMovie(user_id, movie_id);

    // return userHasFavoriteMovie.identifiers[0]; // as UserHasFavoriteMovie;
    return userAndMovie; // as UserHasFavoriteMovie;
  }

  public async findUserHasThisFavoriteMovie(
    user_id: number,
    movie_id: number,
  ): Promise<UserHasFavoriteMovie | undefined> {
    const userAndMovie = await getManager()
      .createQueryBuilder(UserHasFavoriteMovie, 'user_and_movie')
      .where(
        `user_and_movie.user_id = :user_id
        AND user_and_movie.movie_id = :movie_id`,
        { user_id, movie_id },
      )
      .getOne();

    return userAndMovie;
  }

  public async deleteUserFavoriteMovie(
    user_id: number,
    movie_id: number,
  ): Promise<void> {
    await getManager()
      .createQueryBuilder()
      .delete()
      .from(UserHasFavoriteMovie)
      .where('user_id = :user_id AND movie_id = :movie_id', {
        user_id,
        movie_id,
      })
      .execute();
  }
}

export default UserFavoriteMoviesRepository;
