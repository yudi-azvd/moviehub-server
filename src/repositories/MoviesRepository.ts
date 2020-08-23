import { AxiosInstance } from 'axios';

import Actor, { APICredits } from '../models/Actor';
import Movie, { APIMovie } from '../models/Movie';

import createAxiosInstance from '../api';

interface UpcomingMovies {
  results: APIMovie[];
}

class MoviesRepository {
  private api: AxiosInstance;

  constructor() {
    this.api = createAxiosInstance();
    this.api.defaults.baseURL += '/movie';
  }

  public async findById(id: number | string): Promise<Movie> {
    const movieResponse = await this.api.get(`${id}`);

    const movie = new Movie(movieResponse.data);

    movie.cast = await this.getCast(id);

    return movie;
  }

  // TODO: move it to ActorsRepository.getActorsFromMovie()
  private async getCast(movieId: string | number): Promise<Actor[]> {
    const creditsResponse = await this.api.get<APICredits>(
      `${movieId}/credits`,
    );

    const numberOfActors = 10;

    const actors = creditsResponse.data.cast.map(
      apiActor => new Actor(apiActor),
    );
    const firstTenActors = actors.splice(0, numberOfActors);

    return firstTenActors;
  }

  public async findUpcoming(): Promise<Movie[]> {
    const moviesResponse = await this.api.get<UpcomingMovies>('/upcoming');

    const movies = moviesResponse.data.results.map(result => new Movie(result));

    return movies;
  }
}

export default MoviesRepository;
