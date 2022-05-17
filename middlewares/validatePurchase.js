import chalk from 'chalk';

import { purchaseSchema } from '../models/schemas/purchase.js';
import { ERROR } from '../models/blueprints/chalk.js';

export default async function validatePurchase(req, res, next) {

    const { items, amount } = req.body;

    const validate = purchaseSchema.validate({ items, amount }, { abortEarly: false });
    if (validate.error) {
        console.log(chalk.red(`${ERROR} ${validate.error.details.map((e) => e.message).join(', ')}`));
        return res.status(422).send({
            message: 'Invalid input',
            details: `${validate.error.details.map((e) => e.message).join(', ')}`,
        });
    }
    res.locals.items = items;
    res.locals.amount = amount;

    next();
}