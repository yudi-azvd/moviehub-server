import { AxiosInstance } from 'axios';

import Actor, { APICredits } from '../models/Actor';
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

    movie.cast = await this.getCast(id);

    return movie;
  }

  private async getCast(movieId: string | number): Promise<Actor[]> {
    const actorsResponse = await this.api.get<APICredits>(`${movieId}/credits`);

    const numberOfActors = 10;

    const cast = actorsResponse.data.cast.map(apiActor => new Actor(apiActor));
    const firstTenActors = cast.splice(0, numberOfActors);

    return firstTenActors;
  }

  public async findUpcoming(): Promise<Movie[]> {
    const moviesResponse = await this.api.get<UpcomingMovies>('/upcoming');

    const movies = moviesResponse.data.results.map(result => new Movie(result));

    return movies;
  }
}

export default MoviesRepository;
