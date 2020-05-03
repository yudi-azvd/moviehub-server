import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

/**
 * The Movie Database API
 * (TMDB)
 */

const api = axios.create({
  baseURL: process.env.TMDB_BASE_URL,
});

const apiParams = {
  api_key: process.env.TMDB_API_KEY,
  language: 'pt-BR',
};

export { apiParams };

export default api;
