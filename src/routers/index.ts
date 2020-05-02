import { Router } from 'express';

const router = Router();

router.get('/ola', (request, response) => {
  const oi = 'olá';

  return response.json({ oi });
});

export default router;
