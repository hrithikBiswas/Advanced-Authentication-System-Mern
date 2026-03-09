const Token = require('../models/token.model');

const createToken = async (userId, refreshToken) => {
    const token = new Token({
        user: userId,
        token: refreshToken,
    });
    await token.save();
    return token;
};

const deleteTokenByUserId = async (userId) => {
    return await Token.deleteOne({ user: userId });
};

module.exports = {
    createToken,
    deleteTokenByUserId,
};
