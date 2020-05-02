class Movie {
  id?: number;

  title: string;

  overview: string;

  constructor({ title, overview }: Movie) {
    this.overview = overview;
    this.title = title;
  }
}

export default Movie;
