const jwt = require('jsonwebtoken');

const AuthMiddleware = (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({ message: 'Access Denied - No Token' });
        }

        const verified = jwt.verify(token, process.env.SECRET_KEY);

        req.user = verified;
        next();

    } catch (err) {
        return res.status(401).json({ message: 'Invalid or Expired Token' });
    }
};

module.exports = AuthMiddleware;