const jwt = require('jsonwebtoken');
const { createError } = require('../utils/error.util');
const { JWT_SECRET_ACCESS_TOKEN } = require('../config/env');

const authenticateMiddleware = (req, _res, next) => {
    try {
        const { accessToken } = req.cookies;
        if (!accessToken) {
            throw createError(
                'Unauthorized access. Please log in to continue.',
                401,
            );
        }

        const decodedToken = jwt.verify(accessToken, JWT_SECRET_ACCESS_TOKEN);

        if (!decodedToken || !decodedToken.id) {
            throw createError('Invalid token. Please log in again.', 401);
        }

        req.userId = decodedToken.id;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = authenticateMiddleware;
