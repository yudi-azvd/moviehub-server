import { Router } from 'express';

import moviesRouter from './moviesRouter';

const router = Router();

router.use('/movies', moviesRouter);

export default router;
