import { Router } from 'express';

import MovieReviewsController from '../controllers/MovieReviewsController';

const movieReviewsRouter = Router();

const movieReviewController = new MovieReviewsController();

movieReviewsRouter.get('/:movie_id', movieReviewController.index);

movieReviewsRouter.post('/', movieReviewController.create);

export default movieReviewsRouter;
