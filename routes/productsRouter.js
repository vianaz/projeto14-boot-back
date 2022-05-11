import express from "express";

import products from "../controllers/productsController.js";

const productsRouter = express.Router();

productsRouter.get("/products", products);

export default productsRouter;
