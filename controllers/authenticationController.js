import bcrypt from 'bcrypt';
import chalk from 'chalk';
import { v4 as uuid } from 'uuid';
import { stripHtml } from 'string-strip-html';
import dotenv from 'dotenv';

import { ERROR, DB_INFO } from '../models/blueprints/chalk.js';
import database from '../server/mongoClient.js';

dotenv.config();

export async function signUp(req, res) {

    const name = stripHtml(req.body.name).result.trim();
    const email = stripHtml(req.body.email).result.trim();
    const password = bcrypt.hashSync(req.body.password, process.env.SALT);

    try {
        await database.collection('accounts').insertOne({
            name: name,
            email: email,
            password: password,
            singup_date: new Date()
        });
        console.log(chalk.blue(`${DB_INFO} User ${chalk.bold(email)} created`));
        res.sendStatus(201);
    } catch (error) {
        console.log(chalk.red(`${ERROR} ${error}`));
        res.status(500).send({
            message: 'Internal error creating user',
            detail: error,
        });
    }
}

export async function signIn(_req, res) {

    const email = res.locals.email;
    const user = res.locals.user;

    try {
        const token = uuid();
        await database.collection('sessions').insertOne({
            email: user.email,
            active: false,
            token: token,
            last_login: null,
        });
        console.log(chalk.blue(`${DB_INFO} User ${chalk.bold(email)} logged in`));
        res.send({
            name: user.name,
            email: user.email,
            token: token,
        });
    } catch (error) {
        console.log(chalk.red(`${ERROR} ${error}`));
        res.status(500).send({
            message: 'Internal error while logging in user',
            detail: error,
        });
    }
}