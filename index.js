import express from "express";

import authenticationRouter from "./routes/authenticationRouter.js";
import productsRouter from "./routes/productsRouter.js";

const app = express();

app.use(authenticationRouter); // sign in, sign up, logout
app.use(productsRouter);

app.listen(process.env.PORT, () => {
	console.log(`Server running at http://localhost:${process.env.PORT}`);
});
