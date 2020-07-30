/* eslint-disable no-param-reassign */
import axios, { AxiosRequestConfig } from 'axios';

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

// desse jeito não tem como sobrescrever parâmetros depois
api.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    config.params = apiParams;
    return config;
  },
);

export { apiParams };

export default api;
