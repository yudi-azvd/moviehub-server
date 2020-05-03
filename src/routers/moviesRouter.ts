import { Router } from 'express';

import MoviesRepository from '../repositories/MoviesRepsitory';

const moviesRouter = Router();

const moviesRepository = new MoviesRepository();

moviesRouter.get('/upcoming', async (request, response) => {
  try {
    const movies = await moviesRepository.getUpcoming();
    return response.json(movies);
  } catch (error) {
    return response.json({ error: true });
  }
});

moviesRouter.get('/:id', async (request, response) => {
  try {
    const movie = await moviesRepository.findOne(request.params.id);
    return response.json(movie);
  } catch (error) {
    return response.json({ error: true });
  }
});

export default moviesRouter;
