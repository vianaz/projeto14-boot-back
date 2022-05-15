import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
import chalk from 'chalk';

import { ERROR, DB_INFO } from '../models/blueprints/chalk.js';

dotenv.config();

let database = null;

const mongoClient = new MongoClient(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

try {
	await mongoClient.connect();
	database = mongoClient.db(process.env.DATABASE);
	console.log(chalk.blue(`${DB_INFO} Connected to database ${chalk.bold.blue(database.databaseName)}`));
} catch (error) {
	console.log(chalk.red(`${ERROR} ${error}`));
}

export default database;