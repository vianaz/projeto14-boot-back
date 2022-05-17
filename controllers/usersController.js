import chalk from 'chalk';

import database from '../server/MongoClient.js';
import { ERROR } from '../models/blueprints/chalk.js';

export async function getAll(_req, res) {

    try {
        const users = await database.collection('accounts').find().toArray();
        res.send(
            users.map((user) => {
                return {
                    name: user.name,
                    email: user.email,
                };
            })
        );
    } catch (error) {
        console.log(chalk.red(`${ERROR} ${error}`));
        res.status(500).send({
            message: 'Internal error while getting users',
            detail: `${error}`
        });
    }
}

export async function getCart(_req, res) {

    const user = res.locals.user;

    try {
        const queryUser = await database.collection('accounts').findOne({ email: user.email });
        res.send({ cart: queryUser.cart });
    } catch (error) {
        console.log(chalk.red(`${ERROR} ${error}`));
        return res.status(500).send({
            message: "Internal error while getting balance",
            detail: `${error}`
        });
    }
}

export async function signOut(_req, res) {

    const email = res.locals.user.email;

    const isUserOnline = await database.collection('sessions').findOne({ email: email });
    if (!isUserOnline) {
        return res.status(401).send({
            message: 'User is not logged in',
            detail: 'Ensure that the corresponding token is valid',
        });
    }

    try {
        await database.collection('sessions').deleteOne({ email: email });
        res.sendStatus(200);
    } catch (error) {
        console.log(chalk.red(`${ERROR} ${error}`));
        return res.status(500).send({
            message: 'Internal error while signing off user',
            detail: `${error}`
        });
    }
}