const mongoose = require ('mongoose');
const PointSchema = require('./utils/PointSchema');


const CardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required:true,
    },
    categoria: {
        type:String,
        required:true,
        lowercase: true,
    },
    location:{
        type: PointSchema,
        index: '2dsphere'
    },
    cep:{
        type: Number,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    curtida:{
        type: Number,
        default:0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

const Card = mongoose.model('Card', CardSchema)

module.exports = Card;