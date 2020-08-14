import { Router } from 'express';

import ReviewsRepository from '../repositories/ReviewsRepository';

const reviewsRouter = Router();

reviewsRouter.get('/:movieId', async (request, response) => {
  const reviewsRepository = new ReviewsRepository();

  const reviews = await reviewsRepository.findAllFromMovie(
    request.params.movieId,
  );

  return response.json(reviews);
});

export default reviewsRouter;
