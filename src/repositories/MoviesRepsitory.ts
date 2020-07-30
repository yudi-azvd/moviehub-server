import { AxiosInstance } from 'axios';

import Movie, { APIMovie } from '../models/Movie';

import api from '../api';

interface UpcomingMovies {
  results: APIMovie[];
}

class MoviesRepository {
  private api: AxiosInstance;

  constructor() {
    this.api = api;
    this.api.defaults.baseURL += '/movie';
  }

  public async findOne(id: number | string): Promise<Movie> {
    const movieResponse = await this.api.get(`${id}`);

    const movie = new Movie(movieResponse.data);

    return movie;
  }

  public async findUpcoming(): Promise<Movie[]> {
    const moviesResponse = await this.api.get<UpcomingMovies>('/upcoming');

    const movies = moviesResponse.data.results.map(result => new Movie(result));

    return movies;
  }
}

export default MoviesRepository;
