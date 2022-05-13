import express, { json } from 'express'; // server
import cors from 'cors';
import dotenv from 'dotenv'; // environment variables

import router from './routes/router.js';

const app = express();

dotenv.config();

app.use(json());
app.use(cors());
app.use(router);

const port = process.env.PORT || 5000; // establishing the port -> production or development

app.listen(port, () => {
	console.log(`Server running on port: ${port}`);
});
