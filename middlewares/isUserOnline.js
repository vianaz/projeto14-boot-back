import chalk from 'chalk';
import { ERROR } from '../models/blueprints/chalk.js';

import database from '../server/mongoClient.js';

export default async function isUserOnline(_req, res, next) {

    const email = res.locals.email;

    try {
        const isUserOnline = await database.collection('sessions').findOne({ email: email });
        if (isUserOnline?.active) {
            console.log(chalk.red(`${ERROR} User ${chalk.bold(email)} is already logged in`));
            return res.status(409).send({
                message: `User is already logged in`,
                detail: `Ensure that ${email} is not already logged in`,
            });
        }
    } catch (error) {
        console.log(chalk.red(`${ERROR} ${error}`));
        res.status(500).send({
            message: 'Internal error while logging in user',
            detail: error
        });
    }

    next();
}