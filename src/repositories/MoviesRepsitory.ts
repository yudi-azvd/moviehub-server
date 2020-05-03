import axios, { AxiosInstance } from 'axios';
import dotenv from 'dotenv';

import Movie from '../models/Movie';

dotenv.config();

interface UpcomingMovies {
  results: Movie[];
}

class MovieRepository {
  private api: AxiosInstance;

  private apiParams;

  constructor() {
    this.apiParams = {
      api_key: process.env.TMDB_API_KEY,
      language: 'pt-BR',
    };

    this.api = axios.create({
      baseURL: `${process.env.TMDB_BASE_URL}/movie`,
      // Não funciona
      // params: {
      //   api_key: process.env.TMDB_API_KEY,
      //   language: 'pt-BR',
      // },
    });
  }

  public async findOne(id: number | string): Promise<Movie> {
    const movieResponse = await this.api.get(`${id}`, {
      params: this.apiParams,
    });

    const movie = new Movie(movieResponse.data);

    return movie;
  }

  public async getUpcoming(): Promise<Movie[]> {
    const moviesResponse = await this.api.get<UpcomingMovies>('/upcoming', {
      params: {
        api_key: process.env.TMDB_API_KEY,
      },
    });

    const movies = moviesResponse.data.results.map(result => new Movie(result));

    return movies;
  }
}

export default MovieRepository;
