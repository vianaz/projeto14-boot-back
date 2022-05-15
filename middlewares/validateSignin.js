import bcrypt from 'bcrypt';
import chalk from 'chalk';

import { ERROR } from '../models/blueprints/chalk.js';

export default async function validateSignIn(req, res, next) {

    const user = res.locals.user;

    if (!bcrypt.compareSync(req.body.password, user.password)) {
        console.log(chalk.red(`${ERROR} Password  is invalid`));
        return res.status(403).send({
            message: `Password is invalid`,
            detail: `Ensure that the username and password included in the request are correct`,
        });
    }
    delete user.password;
    res.locals.user = user;

    next();
}