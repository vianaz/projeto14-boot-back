import express from 'express';
import dotenv from 'dotenv';

import authenticationRouter from './routes/authenticationRouter.js';

dotenv.config()

const router = express.Router();

router.use(authenticationRouter); // sign in, sign up, logout

export default router;