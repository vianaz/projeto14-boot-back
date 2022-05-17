import chalk from 'chalk';

import { ERROR } from '../models/blueprints/chalk.js';

export default async function haveStock(_req, res, next) {

    const { items, products } = res.locals;
    const notInStock = [];
    console.log(items);

    for (let i=0; i<items.length; i++) {
        if (products[i].inventory < items[i].volume) {
            notInStock.push(products[i].title);
        }
        items[i].title = products[i].title;
    }
    if (notInStock.length > 0) {
        console.log(chalk.red(`${ERROR} Item not in stock`));
        return res.status(422).send({
            message: 'Item not in stock',
            detail: `${notInStock.join(', ')}`
        });
    }

    next();
}