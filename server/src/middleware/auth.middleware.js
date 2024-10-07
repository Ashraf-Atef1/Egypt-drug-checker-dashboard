const jwt = require('jsonwebtoken');

function authenticateToken(accessNumber) {
    const userTypes = {
        0: ['admin'],
        1: ['admin', 'doctor'],
        2: ['admin', 'doctor', 'user']
    }
    return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return res.sendStatus(401);
            
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            if (!userTypes[accessNumber].includes(user.userType)) return res.sendStatus(403);
            next();
        })
    };
}
module.exports = {authenticateToken};