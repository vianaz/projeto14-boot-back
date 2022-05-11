import express from 'express';

import { signUp, signIn, logOut } from '../controllers/authenticationController.js';

const authenticationRouter = express.Router();

authenticationRouter.post('/signUp', signUp);
authenticationRouter.post('/signIn', signIn);
authenticationRouter.post('/logOut', logOut);

export default authenticationRouter;