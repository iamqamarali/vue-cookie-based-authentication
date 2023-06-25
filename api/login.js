import jwt from 'jsonwebtoken';

const users = [
    { id: 1, username: 'admin', password: 'admin' },
    { id: 2, username: 'Qamar', password: 'password' }
]

// check user credentials create jwt token for user and save it to cookie
export default function (req, res) {
    const { username, password } = req.body;    

    // find the user
    const user = users.find(u => u.username == username && u.password == password);

    if (!user) {
        res.status(401).json({ message: 'Invalid credentials' });
    }

    
    const token = jwt.sign({ id: user.id, username }, 'secret');

    // set the cookie
    res.setHeader('Set-Cookie', `user_token=${token}; HttpOnly;`);

    // send response
    res.json({ user, token });
}
    