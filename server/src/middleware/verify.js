const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyMiddleware = async (req, res, next) => {
    try {
        req.decoded = jwt.verify(req.headers.token, process.env.SECRET_KEY);
    } catch (error) {
        if(error.name === 'TokenExpiredError'){
            return res.status(419).json({error: "토큰이 만료되었습니다."})
        }

        if(error.name === 'JsonWebTokenError'){
            return res.status(401).json({error: "올바르지 않은 토큰입니다."})
        }
    }
}

module.exports = verifyMiddleware;

