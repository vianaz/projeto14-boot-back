import express from 'express';

import authenticationRouter from './authenticationRouter.js';
/* import sessionsRouter from './sessionsRouter.js';*/
import usersRouter from './usersRouter.js'

const router = express.Router();

router.use(authenticationRouter); // signin, signup
/* router.use(sessionsRouter); */
router.use(usersRouter); // adm commands

export default router;