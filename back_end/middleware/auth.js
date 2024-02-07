const e = require('express');
const jwt = require('jsonwebtoken');


require('dotenv').config();

function Auth(req, res, next) {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        const token = req.headers.authorization.split(' ')[1];
        if (token === null) res.sendStatus(401)
        jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
            if (err){ res.sendStatus(403);
            }else {
                next();
            }
        })

    } else
        res.sendStatus(401)
}


module.exports = Auth;
