const mongoose = require('mongoose')

const pixel = new mongoose.Schema({
    color:{
        type: String,
        required: true,
        default: '#FFFFFF',
    }
})

const gallerySchema = new mongoose.Schema({
    width:{
        type: Number,
        required: true,
    },
    pixels: [pixel],
})

module.exports = mongoose.model('Gallery', gallerySchema)