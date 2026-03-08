const User = require('../models/user.model');

const getUserByUsernme = async (username) => {
    return await User.findOne({ username });
};

const getUserByEmail = async (email) => {
    return await User.findOne({ email });
};

const getUserById = async (id) => {
    return await User.findOne({ id });
};

const CreateUser = async (username, email, password) => {
    const user = new User({ username, email, password });
    return await user.save();
};

module.exports = {
    getUserByUsernme,
    getUserByEmail,
    getUserById,
    CreateUser,
};
