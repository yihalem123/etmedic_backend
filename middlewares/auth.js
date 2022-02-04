//const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req,res,next){
    const token = req.header('x-auth-token');
    if(!token){
        res.status(401).send('Access Denied. Found 0 token');
    }

    try {
        const decoded = jwt.verify(token,"somejwtkey");
        req.loggedClient = decoded;
        next();
    } 
    catch (error) {
        res.status(400).send(error.message)    
    }
}

module.exports = auth;