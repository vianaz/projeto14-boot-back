import express from 'express';
import dotenv from 'dotenv';

import validateUser from './../middlewares/validateUser.js';
import isSingleUser from './../middlewares/isSingleUser.js';
import userExists from './../middlewares/userExists.js';
import validateSignIn from './../middlewares/validateSignIn.js';
import isUserOnline from './../middlewares/isUserOnline.js';

import { signUp, signIn } from './../controllers/authenticationController.js';

dotenv.config();

const authenticationRouter = express.Router();

authenticationRouter.post(process.env.SIGNUP, validateUser, isSingleUser, signUp);
authenticationRouter.post(process.env.SIGNIN, userExists, validateSignIn, isUserOnline, signIn);

export default authenticationRouter;