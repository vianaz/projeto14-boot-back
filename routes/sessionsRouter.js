import express from 'express';
import dotenv from 'dotenv';

import requireToken from './../middlewares/requireToken.js';
import validatePurchase from './../middlewares/validatePurchase.js';
import isUserOnline from './../middlewares/isUserOnline.js';
import userExists from './../middlewares/userExists.js';
import itemsExists from './../middlewares/itemsExists.js';
import haveStock from './../middlewares/haveStock.js';
import {getProducts, userOnline, purchase} from './../controllers/sessionsController.js';

dotenv.config();

const sessionsRouter = express.Router();

sessionsRouter.get(process.env.GET_PRODUCTS, getProducts);
sessionsRouter.get(process.env.GET_USER, requireToken, userOnline);
sessionsRouter.post(process.env.PURCHASE, requireToken, validatePurchase, isUserOnline, userExists, itemsExists, haveStock, purchase);

export default sessionsRouter;