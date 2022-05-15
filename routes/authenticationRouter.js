import express from 'express';
import dotenv from 'dotenv';

import validateUser from './../middleware/validateUser.js';
import isSingleUser from './../middleware/isSingleUser.js';
import userExists from './../middleware/userExists.js';
import validateSignIn from './../middleware/validateSignIn.js';
import isUserOnline from './../middleware/isUserOnline.js';

import { signUp, signIn } from './../controllers/authenticationController.js';

dotenv.config();

const authenticationRouter = express.Router();

authenticationRouter.post(process.env.SIGNUP, validateUser, isSingleUser, signUp);
authenticationRouter.post(process.env.SIGNIN, userExists, validateSignIn, isUserOnline, signIn);

export default authenticationRouter;