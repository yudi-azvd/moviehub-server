import { AxiosInstance } from 'axios';

import Review, { APIReviewsResponse } from '../models/Review';

import createAxiosInstance from '../api';

class ReviewsRepository {
  private api: AxiosInstance;

  constructor() {
    this.api = createAxiosInstance();
    this.api.defaults.baseURL += '/movie';
  }

  public async findAllFromMovie(movieId: number | string): Promise<Review[]> {
    const reviewsResponse = await this.api.get<APIReviewsResponse>(
      `${movieId}/reviews`,
    );

    const reviews = reviewsResponse.data.results.map(
      result => new Review(result),
    );

    return reviews;
  }
}

export default ReviewsRepository;
