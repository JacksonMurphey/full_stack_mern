const jwt = require('jsonwebtoken')

module.exports = {

    authenticate(req, res, next) {
        jwt.verify(
            req.cookies.usertoken,
            process.env.JWT_SECRET,
            (err, payload) => {
                if (err) {
                    console.log(err)
                    res.status(401).json({ verified: false })
                } else {
                    console.log(payload)
                    req.jwtpayload = payload;
                    next()
                }
            }
        )
    }
}



//ERROR Status 401: Means unauthorized 

// line 15: is essentially creating a viariable for the following:
//const decodedJWT = jwt.decoded(req.cookies.usertoken, {
//    complete: true
//})  