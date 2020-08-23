import { Repository, getRepository, getManager } from 'typeorm';
import { AxiosInstance, AxiosResponse } from 'axios';

import createAxiosInstance from '../api';

import UserHasFavoriteMovie from '../models/UserHasFavoriteMovie';
import Movie, { APIMovie } from '../models/Movie';
import User from '../models/User';

class UsersRepository {
  private ormRepository: Repository<User>;

  private movieApi: AxiosInstance;

  constructor() {
    this.ormRepository = getRepository(User);
    this.movieApi = createAxiosInstance();
    this.movieApi.defaults.baseURL += '/movie';
  }

  public async create({
    name,
    email,
    password,
  }: Omit<User, 'id'>): Promise<User> {
    const user = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    if (!user) return undefined;

    user.favoriteMovies = await this.getFavoriteMoviesFromUser(user.id);

    return user;
  }

  public async findById(id: number): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    if (!user) return user;

    user.favoriteMovies = await this.getFavoriteMoviesFromUser(user.id);
    delete user.password;

    return user;
  }

  private async getFavoriteMoviesFromUser(user_id: number): Promise<Movie[]> {
    const userAndFavoriteMoviesIds = await getManager()
      .createQueryBuilder(UserHasFavoriteMovie, 'user_favorite_movie')
      .where('user_favorite_movie.user_id = :id', { id: user_id })
      .getMany();

    const responsesPromises: Promise<AxiosResponse<APIMovie>>[] = [];

    // userAndFavoriteMovieIds não é um typo!
    userAndFavoriteMoviesIds.forEach(userAndFavoriteMovieIds => {
      const { movie_id } = userAndFavoriteMovieIds;

      responsesPromises.push(this.movieApi.get(`${movie_id}`));
    });

    const responses = await Promise.all(responsesPromises);

    const movies = responses
      .map(response => response.data)
      .map(apiMovie => new Movie(apiMovie));

    return movies;
  }
}

export default UsersRepository;
