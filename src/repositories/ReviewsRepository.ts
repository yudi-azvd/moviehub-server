import { AxiosInstance } from 'axios';
import { Repository, getRepository } from 'typeorm';

import Review, { APIReviewsResponse } from '../models/Review';

import createAxiosInstance from '../api';

interface CreateReview {
  author: string;
  author_id: number;
  content: string;
  movie_id: number;
}

class ReviewsRepository {
  private api: AxiosInstance;

  private ormRepository: Repository<Review>;

  constructor() {
    this.api = createAxiosInstance();
    this.api.defaults.baseURL += '/movie';
    this.ormRepository = getRepository(Review);
  }

  public async findAllFromMovie(movieId: number | string): Promise<Review[]> {
    const reviewsResponse = await this.api.get<APIReviewsResponse>(
      `${movieId}/reviews`,
    );

    const apiReviews = reviewsResponse.data.results.map(
      result => new Review(result.id, result.author, result.content),
    );

    const dbReviews = await this.ormRepository.find({
      where: { movie_id: movieId },
      order: { created_at: 'DESC' },
    });

    return [...dbReviews, ...apiReviews];
  }

  public async create({
    movie_id,
    author_id,
    content,
    author,
  }: CreateReview): Promise<Review> {
    const review = this.ormRepository.create({
      movie_id,
      author_id,
      content,
      author,
    });

    await this.ormRepository.save(review);

    return review;
  }
}

export default ReviewsRepository;
