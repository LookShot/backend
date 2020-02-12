const mongoose = require('../../database');

const Tokenchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

});

const Token = mongoose.model('Token', Tokenchema)

module.exports = Token;