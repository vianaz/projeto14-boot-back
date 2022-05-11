import express from 'express';

import authenticationRouter from './routes/authenticationRouter.js';
import productsRouter from './routes/productsRouter.js';

const router = express.Router();

router.use(authenticationRouter); // sign in, sign up, logout
router.use(productsRouter);

export default router;