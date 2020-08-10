import { Router } from 'express';

import MoviesRepository from '../repositories/MoviesRepository';

const moviesRouter = Router();

const moviesRepository = new MoviesRepository();

moviesRouter.get('/upcoming', async (request, response) => {
  const movies = await moviesRepository.findUpcoming();

  return response.json(movies);
});

moviesRouter.get('/:id', async (request, response) => {
  const movie = await moviesRepository.findOne(request.params.id);

  return response.json(movie);
});

export default moviesRouter;
