import bcrypt from 'bcrypt';
import chalk from 'chalk';
import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';

import { ERROR, DB_INFO } from '../models/blueprints/chalk.js';
import database from '../server/MongoClient.js';
import { ObjectId } from 'mongodb';

dotenv.config();

export async function signUp(_req, res) {

    const { name, email, password} = res.locals;
    const cryptPassword = bcrypt.hashSync(password, process.env.SALT);

    try {
        await database.collection('accounts').insertOne({
            name: name,
            email: email,
            password: cryptPassword,
            transactions: [],
            singup_date: new Date()
        });
        console.log(chalk.blue(`${DB_INFO} ${chalk.bold(email)} registered successfully`));
        res.sendStatus(201);
    } catch (error) {
        console.log(chalk.red(`${ERROR} ${error}`));
        res.status(500).send({
            message: 'Internal error creating user',
            detail: `${error}`
        });
    }
}

export async function signIn(_req, res) {

    const { user, sessionId } = res.locals;

    try {
        const token = uuid();

        await database.collection('sessions').deleteOne({ user_id: new ObjectId(user._id) });

        await database.collection('sessions').insertOne({
            _id: sessionId,
            user_id: user._id,
            active: true,
            token: token,
        });
        console.log(chalk.blue(`${DB_INFO} User ${chalk.bold(user.email)} logged in`));
        res.send({ token: token });
    } catch (error) {
        console.log(chalk.red(`${ERROR} ${error}`));
        res.status(500).send({
            message: 'Internal error while logging in user',
            detail: `${error}`
        });
    }
}