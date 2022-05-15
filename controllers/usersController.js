// go to userscontroller
/* // logout
export async function signOut(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer', '').trim();
    if (!token) return res.sendStatus(403); // forbidden error

    try {
        await database.collection('sessions').deleteOne({ token });
        res.sendStatus(200);
    } catch (error) {
        console.log('Error logging out', error);
        return res.sendStatus(500);
    }
} */