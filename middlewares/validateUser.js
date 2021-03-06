import chalk from 'chalk';
import { stripHtml } from 'string-strip-html';

import { userSchema } from '../models/schemas/user.js';
import { ERROR } from '../models/blueprints/chalk.js';

export default async function validateUser(req, res, next) {

    const name = stripHtml(req.body.name).result.trim();
    const email = stripHtml(req.body.email).result.trim();

    const validate = userSchema.validate(
        { name: name, email: email, password: req.body.password },
        { abortEarly: false }
    );

    if (validate.error) {
        console.log(chalk.red(`${ERROR} ${validate.error.details.map((e) => e.message)}`));
        return res.status(422).send({
            message: 'Invalid input',
            details: validate.error.details.map((e) => e.message)
        });
    }

    next();
}