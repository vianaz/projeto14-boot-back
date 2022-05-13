import express, { json } from 'express'; // server
import cors from 'cors';
import dotenv from 'dotenv'; // environment variables
import chalk from 'chalk';

import router from './routes/router.js';
import { SERVER_INFO } from "./models/blueprint/chalk.js";

const app = express();

dotenv.config();

app.use(json());
app.use(cors());
app.use(router);

const port = process.env.PORT || 5000; // establishing the port -> production or development

app.get("/", (_req, res) => {
	res.send("Online");
});

app.listen(port, () => {
	console.log(
		chalk.bold.yellow(
		  `${SERVER_INFO} Server started on port ${chalk.bold.yellow(PORT)}`
		)
	);
});
