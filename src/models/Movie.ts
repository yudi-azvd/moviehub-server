export interface APIMovie {
  id: number;

  title: string;

  original_title: string;

  overview: string;

  poster_path: string;

  backdrop_path: string;
}

class Movie {
  id: number;

  title: string;

  originalTitle: string;

  overview: string;

  posterPath: string;

  backdropPath: string;

  constructor({
    title,
    original_title,
    overview,
    id,
    poster_path,
    backdrop_path,
  }: APIMovie) {
    this.id = id;
    this.title = title;
    this.originalTitle = original_title;
    this.overview = overview;
    this.posterPath = poster_path;
    this.backdropPath = backdrop_path;
  }
}

export default Movie;
