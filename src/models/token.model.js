const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        token: { type: String, required: true, unique: true },
    },
    { timestamps: true },
);

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
