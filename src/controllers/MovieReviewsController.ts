import { Request, Response } from 'express';

import ReviewsRepository from '../repositories/ReviewsRepository';

class MovieReviewsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const reviewsRepository = new ReviewsRepository();

    const reviews = await reviewsRepository.findAllFromMovie(
      request.params.movie_id,
    );

    return response.json(reviews);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { movie_id, author, author_id, content } = request.body;

    const reviewsRepository = new ReviewsRepository();

    const review = await reviewsRepository.create({
      movie_id,
      author_id,
      content,
      author,
    });

    return response.json(review);
  }
}

export default MovieReviewsController;
