import { Router } from 'express';

import moviesRouter from './moviesRouter';
import reviewsRouter from './reviewsRouter';

const router = Router();

router.use('/movies', moviesRouter);

router.use('/reviews', reviewsRouter);

export default router;
