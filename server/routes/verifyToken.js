const jwt = require("jsonwebtoken")



const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token

    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, "galib", (err, user) => {
            if (err) res.status(403).json("token is not valid");
            req.user = user;
            next();
        })
    } else {
        return res.status(401).json("You are not authenticated! ")
    }
}

const varifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("you are not allowed to do that ")
        }
    })
}
const varifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("you are not ADMIN ")
        }
    })
}
module.exports = {
    verifyToken,
    varifyTokenAndAuthorization,
    varifyTokenAndAdmin
}