const authService = require('../services/auth.service');

const registerController = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const { newUser, accessToken, refreshToken } =
            await authService.register(username, email, password);

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
        });

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: newUser,
        });
    } catch (error) {
        next(error);
    }
};

const loginController = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const { user, accessToken, refreshToken } = await authService.login(
            email,
            password,
        );

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
        });

        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            user,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerController,
    loginController,
};
