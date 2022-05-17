import { ObjectId } from "mongodb";
import chalk from 'chalk';

import database from "../server/MongoClient";
import { ERROR } from '../models/blueprints/chalk.js';

export default async function itemsExists(_req, res, next) {

    const { items } = res.locals;
    console.log(items);

    const products = await database.collection('products')
        .find({ _id: { $in: items.map((item) => new ObjectId(item.product_id)) } })
        .toArray();
    if(products.length !== items.length) {
        console.log(chalk.red(`${ERROR} Invalid item product_id`));
        return res.status(404).send({
            message: 'Invalid item id',
            detail: 'Ensure that the item id is valid'
        });
    }
    res.locals.products = products;

    next();
}