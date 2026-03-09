const jwt = require('jsonwebtoken');
const {
    JWT_SECRET_ACCESS_TOKEN,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRES_IN,
    JWT_REFRESH_TOKEN_EXPIRES_IN,
} = require('../config/env');
const { createError } = require('../utils/error.util');

const generateTokens = (user) => {
    const accessToken = jwt.sign(
        { id: user._id, role: user.role },
        JWT_SECRET_ACCESS_TOKEN,
        { expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN },
    );
    const refreshToken = jwt.sign(
        { id: user._id, role: user.role },
        JWT_SECRET_REFRESH_TOKEN,
        { expiresIn: JWT_REFRESH_TOKEN_EXPIRES_IN },
    );
    return { accessToken, refreshToken };
};

module.exports = {
    generateTokens,
};
