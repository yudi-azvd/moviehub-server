import axios, { AxiosInstance } from 'axios';
import dotenv from 'dotenv';

import Movie from '../models/Movie';

dotenv.config();

class MovieRepository {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.TMDB_BASE_URL}/movie`,
      // Não funciona
      params: {
        api_key: process.env.TMDB_API_KEY,
      },
    });
  }

  public async getUpcoming(): Promise<Movie[]> {
    const moviesResponse = await this.api.get('/upcoming', {
      params: {
        api_key: process.env.TMDB_API_KEY,
      },
    });

    return moviesResponse.data.results;
  }
}

export default MovieRepository;
