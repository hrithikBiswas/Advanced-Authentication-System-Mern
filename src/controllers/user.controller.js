const userService = require('../services/user.service');

const user = async (req, res, next) => {
    try {
        const userId = req.userId;

        const user = await userService.user(userId);

        res.status(200).json({
            success: true,
            message: 'User retrieved successfully',
            user,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    user,
};
