class Movie {
  id: number;

  title: string;

  overview: string;

  constructor({ title, overview, id }: Movie) {
    this.id = id;
    this.title = title;
    this.overview = overview;
  }
}

export default Movie;
