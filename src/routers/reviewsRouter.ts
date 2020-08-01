import { Router } from 'express';

import ReviewsRepository from '../repositories/ReviewsRepository';

const reviewsRouter = Router();

const reviewsRepository = new ReviewsRepository();

reviewsRouter.get('/:movieId', async (request, response) => {
  const reviews = await reviewsRepository.findAllFromMovie(
    request.params.movieId,
  );

  return response.json(reviews);
});

export default reviewsRouter;
