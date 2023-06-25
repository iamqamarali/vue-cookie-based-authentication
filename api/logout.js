export default function (req, res) {
    res.setHeader('Set-Cookie', `user_token=; HttpOnly;`);
    res.json({ success: 'OK' });
}