const userRepository = require('../repositories/user.repository');
const { createError } = require('../utils/error.util');

const user = async (userId) => {
    const user = await userRepository.getUserById(userId);

    if (!user) {
        throw createError('User not found', 404);
    }

    return user;
};

module.exports = {
    user,
};
