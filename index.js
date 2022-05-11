import express from 'express';

import authenticationRouter from './routes/authenticationRouter.js';
import productsRouter from './routes/productsRouter.js';
import cartRouter from './routes/cartRouter.js';

const router = express.Router();

router.use(authenticationRouter); // sign in, sign up, logout
router.use(productsRouter);
router.use(cartRouter);

export default router;