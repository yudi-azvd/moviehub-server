import { Router } from 'express';

import MoviesRepository from '../repositories/MoviesRepsitory';

const moviesRouter = Router();

const moviesRepository = new MoviesRepository();

moviesRouter.get('/upcoming', async (request, response) => {
  try {
    const movies = await moviesRepository.getUpcoming();
    return response.json(movies);
  } catch (error) {
    console.log(error);
    return response.json({ error: true });
  }
});

export default moviesRouter;
