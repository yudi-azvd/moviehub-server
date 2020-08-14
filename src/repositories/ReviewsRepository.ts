import { AxiosInstance } from 'axios';
import { Repository, getRepository } from 'typeorm';

import Review, { APIReviewsResponse } from '../models/Review';

import createAxiosInstance from '../api';

class ReviewsRepository {
  private api: AxiosInstance;

  private ormRepository: Repository<Review>;

  constructor() {
    this.ormRepository = getRepository(Review);
    this.api = createAxiosInstance();
    this.api.defaults.baseURL += '/movie';
  }

  public async findAllFromMovie(movieId: number | string): Promise<Review[]> {
    const reviewsResponse = await this.api.get<APIReviewsResponse>(
      `${movieId}/reviews`,
    );

    const reviews = reviewsResponse.data.results.map(
      result => new Review(result.id, result.author, result.content),
    );

    return reviews;
  }

  public async create({ movieId, author, content }): Promise<Review> {
    this.ormRepository.create({ movieId, author, content });
  }
}

export default ReviewsRepository;
