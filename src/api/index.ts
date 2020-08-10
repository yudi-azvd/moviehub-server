/* eslint-disable no-param-reassign */
import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

/**
 * The Movie Database API
 * (TMDB)
 */
function createAxiosInstance(): AxiosInstance {
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

  return api;
}

export default createAxiosInstance;
