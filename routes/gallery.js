const express = require('express')
const router = express.Router()
const Gallery = require('../models/gallery')

// get gallery
router.get('/', async (req, res) => {
    try{
        const gallery = await Gallery.find()
        res.json(gallery)
    } catch(err){
        res.status(400).json({ message: err.message })
    }
})

// create one gallery piece
router.post('/', async (req, res) => {
    const gallery = new Gallery({
        width: req.body.width,
        pixels: req.body.pixels,
    })
    try{
        const newGallery = await gallery.save()
        res.status(201).json(newGallery)
    } catch(err){
        res.status(400).json({ message: err.message })
    }
})

module.exports = router