import express from 'express';
import dotenv from 'dotenv';

import validateUser from './../middleware/validateUser.js';
import isUserUnique from './../middleware/isSingleUser.js';
import userExists from './../middleware/userExists.js';
import validateSignin from './../middleware/validateSignin.js';
import isUserOnline from './../middleware/isUserOnline.js';

import { signUp, signIn } from './../controllers/authenticationController.js';

dotenv.config();

const authenticationRouter = express.Router();

authenticationRouter.post(process.env.SIGNUP, validateUser, isSingleUser, signUp);
authenticationRouter.post(process.env.SIGNIN, userExists, validateSignin, isUserOnline, signIn);

export default authenticationRouter;