const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    sobre: {
        type: String,
        default: null
    },
    contato: {
        type: Number,
        default: null
    },
    facebook: {
        type: String,
        default: null
    },
    instagram: {
        type: String,
        default: null
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    perfil: {
        type: String,
    },
    portfolio: {
        type: [String],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },

    passwordResetToken: {
        type: String,
        select: false
    },

    passwordResetExprires: {
        type: Date,
        select: false,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

});

UserSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
