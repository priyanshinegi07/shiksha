const jwt = require("jsonwebtoken");

//function acting as middleware 
function auth(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) return res.status(401).json({
        message : "no token, authorization denied"
    });
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if(err) return res.status(403).json({
            message: "Invalid token"
        });
        req.user = user;
        next();
    })
}
module.exports = auth;