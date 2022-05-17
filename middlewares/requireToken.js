import chalk from 'chalk';

import database from '../server/MongoClient.js';
import { ERROR } from './../models/blueprints/chalk.js';

export default async function requireToken(req, res, next) {

    const token = req.header('Authorization')?.slice(7);

    try {
        const tokenUser = await database.collection('sessions').findOne({ token: token });
        if (!tokenUser) {
            console.log(chalk.red(`${ERROR} Invalid token`));
            return res.status(404).send({
                message: 'Invalid token',
                detail: 'Ensure that you have a valid token',
            });
        }
        res.locals.token = token;
        res.locals.user = tokenUser;
    } catch (error) {
        console.log(chalk.red(`${ERROR} ${error}`));
        return res.status(500).send({
            message: 'Internal error while getting transactions',
            detail: error,
        });
    }

    next();
}