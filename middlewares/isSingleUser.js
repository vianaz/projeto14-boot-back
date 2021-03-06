import chalk from 'chalk';
import { stripHtml } from 'string-strip-html';

import { ERROR } from '../models/blueprints/chalk.js';
import database from '../server/MongoClient.js';

export default async function isSingleUser(req, res, next) {

    const email = stripHtml(req.body.email).result.trim();

    try {
        const user = await database.collection('accounts').findOne({ email: email });
        if (user) {
            console.log(chalk.red(`${ERROR} Email ${chalk.bold(email)} is already in use`));
            return res.status(409).send({
                message: 'Email is already in use',
                detail: `Ensure that ${email} is not already in use`,
            });
        }
    } catch (error) {
        console.log(chalk.bold.red(error));
        res.status(500).send({
            message: 'Internal error creating user',
            detail: `${error}`
        });
    }

    next();
}