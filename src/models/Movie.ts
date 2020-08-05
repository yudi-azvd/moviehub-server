import Actor from './Actor';

/* eslint-disable no-underscore-dangle */
export interface APIMovie {
  id: number;

  title: string;

  overview: string;

  tagline: string;

  runtime: number;

  genres: {
    id: number;
    name: string;
  }[];

  poster_path: string;

  backdrop_path: string;

  vote_average: number;
}

class Movie {
  static tmdbBaseImageUrl = process.env.TMDB_BASE_IMAGE_URL;

  id: number;

  title: string;

  overview: string;

  genres?: string[];

  tagline: string;

  runtime?: number | null;

  posterPath: string;

  backdropPath: string;

  voteAverage: number;

  cast?: Actor[];

  constructor({
    title,
    overview,
    id,
    poster_path,
    backdrop_path,
    vote_average,
    tagline,
    genres,
    runtime,
  }: APIMovie) {
    this.id = id;
    this.title = title;
    this.overview = overview;
    this.tagline = tagline;

    if (genres) this.genres = genres.map(genre => genre.name);

    this.runtime = runtime;
    this.voteAverage = vote_average;
    this.posterPath = poster_path;
    this.backdropPath = backdrop_path;
  }
}

export default Movie;
