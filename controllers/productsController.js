import db from "../db.js";

export default async function getProducts(req, res) {
	try {
		const products = await db.collection("products").find({}).toArray();
		res.status(200).send(products);
	} catch (error) {
		console.log(error);
		res.status(400).send(error);
	}
}
