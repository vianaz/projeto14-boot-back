/* import joi from 'joi';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

// validation -> joi
const signUpSchema = joi.object({
    username: joi.string()
        .alphanum()
        .min(3)
        .max(50)
        .required(),
    password: joi.string()
        .required(),
    repeatPassword: joi.ref('password'),
    email: joi.string()
        .email()
        .required()
})

const signInSchema = joi.object({
    password: joi.string()
        .required(),
    email: joi.string()
        .email()
        .required()
})

// register
export async function signUp(req, res) {

    const { username, email, password, confirmPassword } = req.body;
    const validation = signUpSchema.validate({ username, email, password, confirmPassword });

    // error
    if (validation.error) {
        return res.status(422).send(error.details.map(detail => detail.message)); // unprocessable entity
    }

    const SALT = 10;
    const hashPassword = bcrypt.hashSync(password, SALT); // encrypting password

    try {
        const checkUser = await dbLeitura.collection('users').findOne({ email });
        if (checkUser) {
            console.log("Error! User already exist")
            return res.sendStatus(401);
        }

        await dbLeitura.collection('users').insertOne({ username, email, password: hashPassword }); // insert user in database
        console.log("User created successfully");
        res.sendStatus(201);
    }
    catch (error) {
        console.log("Error creating new user");
        console.log(error);
        return res.sendStatus(500);
    }
}

// login  ~~~~~~~~~~~~~~MELHORAR LOGIN~~~~~~~~~~~~~~
export async function signIn(req, res) {

    const { email, password } = req.body;
    const validation = signInSchema.validate({ email, password });

    // error
    if (validation.error) {
        return res.sendStatus(401);
    }

    try {
        const user = await dbLeitura.collection('users').findOne({ email });
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = uuid();

            await dbLeitura.collection('marketplace').insertOne({
                userId: user._id,
                token
            })
            res.send(token);
        }
        else { res.sendStatus(401); }
    }
    catch {
        res.sendStatus(401);
    }
}

// logout
export async function logOut(req, res) {
    res.sendStatus(201);
} */