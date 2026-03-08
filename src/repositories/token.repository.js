const TOken = require('../models/token.model');

const createToken = async (userId, refreshToken) => {
    const token = new TOken({
        user: userId,
        token: refreshToken,
    });
    await token.save();
    return token;
};

module.exports = {
    createToken,
};
