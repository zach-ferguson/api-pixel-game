const express = require('express')
const router = express.Router()
const Pixel = require('../models/pixel')

// get all pixels
router.get('/', async (req, res) => {
    try{
        const pixels = await Pixel.find()
        res.json(pixels)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// get one pixel
router.get('/:id', getPixel, (req, res) => { 
    try{
        res.send(res.pixel)
    } catch(err) {
        res.send().json({ message: err.message })
    }
})

// create one pixel
router.post('/', async (req, res) => {
    const pixel = new Pixel({
        color: req.body.color,
    })
    try{
        const newPixel = await pixel.save()
        res.status(201).json(newPixel)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// update one pixel
router.patch('/:id', getPixel, async (req, res) => {
    if (req.body.color != null) {
        res.pixel.color = req.body.color
    }
    try {
        const updatedPixel = await res.pixel.save()
        res.json(updatedPixel)
    } catch(err) {
        res.status(400).json({ message: err.message })
    }
})
// delete one
router.delete('/:id', getPixel, async(req, res) => {
    try{
        await res.pixel.remove()
        res.json({ message: 'Successfully deleted pixel' })
    } catch(err){
        res.status(500).json({ message: err.message })
    }
})

async function getPixel(req, res, next) {
    let pixel
    try{
        pixel = await Pixel.findById(req.params.id)
        if (pixel == null) {
            return res.status(404).json({ message: "Cannot find pixel with that id" })
        }
    } catch(err){
        return res.status(500).json({ message: err.message })
    }
    res.pixel = pixel
    next()
}
module.exports = router