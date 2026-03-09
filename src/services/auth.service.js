const bcrypt = require('bcryptjs');
const { createError } = require('../utils/error.util');
const userRepository = require('../repositories/user.repository');
const tokenService = require('./token.service');
const tokenRepository = require('../repositories/token.repository');

const register = async (username, email, password) => {
    if (!username || !email || !password) {
        throw createError('All fields are required', 400);
    }

    const isExistUsername = await userRepository.getUserByUsernme(username);
    const isExistUser = await userRepository.getUserByEmail(email);

    if (isExistUsername) {
        throw createError('Username already exists', 409);
    }

    if (isExistUser) {
        throw createError('User already exists', 409);
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await userRepository.CreateUser(
        username,
        email,
        hashPassword,
    );

    const { accessToken, refreshToken } = tokenService.generateTokens(newUser);

    await tokenRepository.createToken(newUser._id, refreshToken);

    return { newUser, accessToken, refreshToken };
};

const login = async (email, password) => {
    if (!email || !password) {
        throw createError('All fields are required.', 400);
    }

    const user = await userRepository.getUserByEmail(email);

    if (!user) {
        throw createError('Invalid user credentials.', 401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        throw createError('Invalid user credentials.', 401);
    }

    await tokenRepository.deleteTokenByUserId(user._id);

    const { accessToken, refreshToken } = tokenService.generateTokens(user);

    await tokenRepository.createToken(user._id, refreshToken);

    return { user, accessToken, refreshToken };
};

module.exports = {
    register,
    login,
};
