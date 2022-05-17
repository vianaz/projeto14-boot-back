import express from 'express';
import dotenv from 'dotenv';

import requireToken from './../middlewares/requireToken.js';
import {getAll, getCart, signOut} from './../controllers/usersController.js';

dotenv.config();

const usersRouter = express.Router();

usersRouter.get(process.env.GET_USERS, requireToken, getAll);
usersRouter.get(process.env.GET_CART, requireToken, getCart);
usersRouter.post(process.env.SIGNOUT, requireToken, signOut);

export default usersRouter;