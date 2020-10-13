var jwt = require('jsonwebtoken');
// var config = require('./config'); --- to save secrets




function verifyToken(req, res, next) {

    const token = req.headers['x-access-token'];

    console.log(token)

    if (!token)

        return res.status(403).send({
            auth: false,
            message: 'No token provided.'
        });

    jwt.verify(token, "vedyaSecrets", function (err, decoded) {

        if (err)

            return res.status(500).send({
                auth: false,
                message: 'Failed to authenticate token.'
            });



        req.userId = decoded.id;

        next();

    });

}

module.exports = verifyToken;