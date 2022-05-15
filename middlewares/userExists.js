import chalk from 'chalk';
import { stripHtml } from 'string-strip-html';

import { ERROR } from '../models/blueprints/chalk.js';
import database from '../server/mongoClient.js';

export default async function userExists(req, res, next) {

const email = stripHtml(req.body.email).result.trim();

try {
    const user = await database.collection('accounts').findOne({ email });
    if (!user) {
        console.log(chalk.red(`${ERROR} User ${chalk.bold(email)} does not exist`));
        return res.status(404).send({
            message: `User does not exist`,
            detail: `Ensure that ${email} is registered`,
        });
    }
    res.locals.user = user;
    res.locals.email = email;
    } catch (error) {
        console.log(chalk.bold.red(error));
        res.status(500).send({
            message: 'Internal error whilte listing user',
            detail: error,
        });
    }

    next();
}