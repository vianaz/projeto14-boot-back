import db from "../db.js";

export default async function products(req, res) {
	const productsArray = await db.collection("products").find({}).toArray();

	if (!productsArray)
		return res.status(422).send("Houve algum erro no banco, tente novamente!");

	res.status(200).send(productsArray);
}
