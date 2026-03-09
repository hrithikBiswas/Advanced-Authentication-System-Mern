const User = require('../models/user.model');

const getAllUser = async () => {
    return await User.find();
};

const getUserByUsernme = async (username) => {
    return await User.findOne({ username });
};

const getUserByEmail = async (email) => {
    return await User.findOne({ email });
};

const getUserById = async (id) => {
    return await User.findById(id).exec();
};

const CreateUser = async (username, email, password) => {
    const user = new User({ username, email, password });
    return await user.save();
};

module.exports = {
    getAllUser,
    getUserByUsernme,
    getUserByEmail,
    getUserById,
    CreateUser,
};
