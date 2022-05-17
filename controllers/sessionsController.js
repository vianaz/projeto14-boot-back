import dotenv from 'dotenv';
import { ObjectId } from 'mongodb';
import chalk from 'chalk';

import { DB_INFO, ERROR } from '../models/blueprints/chalk.js';
import database from '../server/MongoClient.js';

dotenv.config();

export async function getProducts(_req, res) {

	try {
		const products = await database.collection('products').find().toArray();
		res.status(200).send(products);
	} catch (error) {
		console.log(chalk.red(`${ERROR} ${error}`));
		res.status(500).send({
			message: 'Internal error while getting users',
			detail: error
		});
	}
}

export async function purchase(_req, res) {

	const { items, amount, session } = res.locals;

	try {
		for (let i=0; i<items.length; i++) {
			try {
				await database.collection('products').updateOne(
					{ _id: new ObjectId(items[i].product_id) },
					{ $inc: { inventory: -items[i].volume }}
				)
			} catch (error) {
				console.log(chalk.red(`${ERROR} ${error}`));
				res.status(500).send({
					message: 'Internal error while updating products',
					detail: error
				});
			}
		}

		await database.collection('accounts').updateOne(
			{ _id: new ObjectId(session.user_id) },
			{ $push: {transactions: { items, amount, date: new Date() }}}
		);
		console.log(chalk.blue(`${DB_INFO} User transactions updated`));
		res.sendStatus(200);
	} catch (error) {
		console.log(chalk.red(`${ERROR} ${error}`));
		res.status(500).send({
			message: 'Internal error while getting cart',
			detail: error
		});
	}
}

export async function userOnline(_req, res) {

	const { user } = res.locals;

	try {
		const session = await database.collection('sessions').findOne({ _id: new ObjectId(user.session_id) });

		if (!session || !session.active) {
			console.log(chalk.red(`${ERROR} Invalid token`));
			res.status(403).send({
				message: 'Invalid token',
				detail: 'Ensure to provide a valid token'
			});
		}
	} catch (error) {
		console.log(chalk.red(`${ERROR} ${error}`));
		res.status(500).send({
			message: 'Internal error in database',
			detail: error
		});
	}

	res.send();
}