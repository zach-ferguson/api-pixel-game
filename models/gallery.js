const mongoose = require('mongoose')

const pixel = new mongoose.Schema({
    color:{
        type: String,
        required: true,
        default: '#FFFFFF',
    }
})

const gallerySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    width:{
        type: Number,
        required: true,
    },
    pixels:[pixel],
    authors:{
        type: Array,
        required: true,
    },
    date:{
        type: Date,
        required: true,
    },
    id:{
        type: String,
        required: true,
    },
    collab:{
        type: Boolean,
        required: true,
    }
})

module.exports = mongoose.model('Gallery', gallerySchema)