/* eslint-disable no-underscore-dangle */
export interface APIMovie {
  id: number;

  title: string;

  original_title: string;

  overview: string;

  tagline: string;

  poster_path: string;

  backdrop_path: string;

  vote_average: number;
}

class Movie {
  id: number;

  title: string;

  originalTitle: string;

  overview: string;

  tagline: string;

  posterPath: string;

  backdropPath: string;

  voteAverage: number;

  static tmdbBaseImageUrl = process.env.TMDB_BASE_IMAGE_URL;

  constructor({
    title,
    original_title,
    overview,
    id,
    poster_path,
    backdrop_path,
    vote_average,
    tagline,
  }: APIMovie) {
    this.id = id;
    this.title = title;
    this.originalTitle = original_title;
    this.overview = overview;
    this.tagline = tagline;
    this.voteAverage = vote_average;
    this.posterPath = `${Movie.tmdbBaseImageUrl}/w300${poster_path}`;
    this.backdropPath = `${Movie.tmdbBaseImageUrl}/w1920_and_h800_multi_faces${backdrop_path}`;
  }
}

export default Movie;
