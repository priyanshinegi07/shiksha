const jwt = require("jsonwebtoken");

//function acting as middleware 
function auth(req, res, next) {
    console.log("auth middleware")
    console.log("Authorization header:", req.headers["authorization"]);
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(`token ${token}`)
    if(!token) return res.status(401).json({
        message : "no token, authorization denied"
    });
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if(err) {
            console.log("token not verifieed")
            return res.status(403).json({
            message: "Invalid token"
        });
    }
        req.user = user;
        
        next();
    })
}
module.exports = auth;