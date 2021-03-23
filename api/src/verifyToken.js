const jwt = require('jsonwebtoken')


function verify (req, res, next) {
    const accessToken = req.cookies.accesscookie

    //if there is no token stored in cookies, the request is unauthorized
    if (!accessToken) {
        return res.status(403).send();
    }

    try {
        //use the jwt.verify method to verify the access token
        //throws an error if the token has expired or has a invalid signature
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        next();
    } catch (e) {
        //if an error occured return request unauthorized error
        console.log(e);
        return res.status(403).send();
    }
};

module.exports = verify;