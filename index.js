import express, { json } from 'express'; // server
import cors from 'cors'; // Cross-Origin Resource Sharing
import dotenv from 'dotenv'; // environment variables
import chalk from 'chalk'; // node/terminal text styling

import router from './routes/router.js';
import { SERVER_INFO } from './models/blueprints/chalk.js';

const app = express();

dotenv.config();

app.use(json()); // middleware
app.use(cors()); // middleware
app.use(router);

const port = process.env.PORT /* || 5000 */; // establishing the port -> production or development

app.get('/', (_req, res) => {
	res.send('Online');
});

app.listen(port, () => {
	console.log(chalk.bold.yellow(`${SERVER_INFO} Server started on port ${chalk.bold.yellow(port)}`));
});

// testing heroku