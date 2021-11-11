const mongoose = require('mongoose')

const settingsSchema = new mongoose.Schema({
    width:{
        type: Number,
        required: true,
        default: 20,
    },
})

module.exports = mongoose.model('Settings', settingsSchema)