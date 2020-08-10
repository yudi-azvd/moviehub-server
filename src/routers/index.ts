import { Router } from 'express';

import moviesRouter from './movies.router';
import reviewsRouter from './reviews.router';
import usersRouter from './users.router';
import sessionsRouter from './sessions.router';

const router = Router();

router.use('/sessions', sessionsRouter);

router.use('/users', usersRouter);

router.use('/movies', moviesRouter);

router.use('/reviews', reviewsRouter);

export default router;
