import express from 'express';

import authenticationRouter from './authenticationRouter.js';
import productsRouter from './productsRouter.js';
import usersRouter from './usersRouter.js'

const router = express.Router();

router.use(authenticationRouter); // signin, signup, signout
router.use(productsRouter);
router.use(usersRouter);

export default router;