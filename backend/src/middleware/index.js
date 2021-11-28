const admin = require('../config/firebase-config');

class Middleware {
    async decodeToken(req, res, next) {
        const idToken = req.headers.authorization;
        if (!idToken) {
            return res.status(401).json({
                message: 'no auth token'
            });
        }

        const token = idToken.split(' ')[1];
        try {
            const decodeValue = await admin.auth().verifyIdToken(token);
            console.log('----- decodeValue', decodeValue);
            if (decodeValue) {
                req.user = decodeValue;
                return next();
            }
            return res.status(401).json({
                message: 'unauthorized'
            });
        } catch (error) {
            console.log('decode token error', error);
            return res.status(500).json({
                message: 'Internal Error'
            });
        }
    }
}

module.exports = new Middleware();
