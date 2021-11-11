const mongoose = require('mongoose')

const pixelSchema = new mongoose.Schema({
    color:{
        type: String,
        required: true,
        default: '#FFFFFF'
    }
})

module.exports = mongoose.model('Pixel', pixelSchema)