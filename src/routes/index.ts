import express, { Request, Response, Router } from 'express';
import user from './user.routes';
import categories from './categories.routes';
import products from './products.routes';

import log from '../utils/logger';

const router: Router = express.Router();

router.get('/healthCheck', (_: Request, res: Response) => {
  log.info('The Api is Working');
  res.sendStatus(200);
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
router.get('/', (req: Request, res: Response) => {
  return res.send('Express Typescript on Vercel !!!!!');
});

router.use('/api/v1/users', user);
router.use('/api/v1/categories', categories);
router.use('/api/v1/products', products);

export default router;
