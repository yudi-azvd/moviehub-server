export interface APIReview {
  id: string;
  author: string;
  content: string;
}

export interface APIReviewsResponse {
  results: APIReview[];
}

class Review {
  static tmdbBaseImageUrl = process.env.TMDB_BASE_IMAGE_URL;

  id: string;

  author: string;

  content: string;

  constructor({ id, author, content }: APIReview) {
    this.id = id;
    this.author = author;
    this.content = content;
  }
}

export default Review;
