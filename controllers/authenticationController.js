const jwt = require('jsonwebtoken');

exports.authenticate = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send('Access Denied');
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        require.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

exports.createToken = function (userId) {
    //Create a Token
    const token = jwt.sign({
            id: userId,
        },
        process.env.TOKEN_SECRET);
    return token;
};