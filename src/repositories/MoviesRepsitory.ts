import { AxiosInstance } from 'axios';

import Movie, { APIMovie } from '../models/Movie';

import api, { apiParams } from '../api';

interface UpcomingMovies {
  results: APIMovie[];
}

class MovieRepository {
  private api: AxiosInstance;

  private apiParams: object;

  constructor() {
    this.apiParams = apiParams;

    this.api = api;
    this.api.defaults.baseURL += '/movie';
  }

  public async findOne(id: number | string): Promise<Movie> {
    const movieResponse = await this.api.get(`${id}`, {
      params: this.apiParams,
    });

    const movie = new Movie(movieResponse.data);

    return movie;
  }

  public async findUpcoming(): Promise<Movie[]> {
    const moviesResponse = await this.api.get<UpcomingMovies>('/upcoming', {
      params: this.apiParams,
    });

    const movies = moviesResponse.data.results.map(result => new Movie(result));

    return movies;
  }
}

export default MovieRepository;
