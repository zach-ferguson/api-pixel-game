const express = require('express')
const { nanoid } = require('nanoid')
const router = express.Router()
const Gallery = require('../models/gallery')
const pixel = require('../models/pixel')

// get gallery items
router.get('/', async (req, res) => {
    try{
        const gallery = await Gallery.find()
        res.json(gallery)
    } catch(err){
        res.status(400).json({ message: err.message })
    }
})

// get one gallery item
router.get('/:id', getGalleryItem, (req, res) => { 
    try{
        console.log('right one')
        res.send(res.galleryItem)
    } catch(err) {
        res.send().json({ message: err.message })
    }
})

// create new gallery item
router.post('/new', async (req, res) => {
    var pixelArr = []
    if(req.body.width != null && req.body.height != null){
        for (i=0;i<req.body.height;i++){
            for(j=0;j<req.body.width;j++){
                pixelArr.push(new pixel())
            }
        }
    }
    const gallery = new Gallery({
        name: req.body.name,
        width: req.body.width,
        pixels: pixelArr,
        authors: req.body.authors,
        date: new Date().toISOString(),
        id: nanoid(),
        collab: req.body.collab,
    })
    try{
        const newGallery = await gallery.save()
        res.status(201).json(newGallery)
    } catch(err){
        res.status(400).json({ message: err.message })
    }
})

// update one gallery item 
router.patch('/:id', getGalleryItem, async (req, res) => {
    if (req.galleryItem != null) {
        res.galleryItem = req.gallery
    }
    try {
        const updatedGalleryItem = await res.gallery.save()
        res.json(updatedGalleryItem)
    } catch(err) {
        res.status(400).json({ message: err.message })
    }
})

// update one pixel in galleryItem 
router.patch('/pixel/:id', getGalleryItem, async (req, res) => {
    if (req.body.pixelId != null && req.body.newColor != null) {
        const pixelIndex = res.galleryItem.pixels.findIndex(pixel => pixel._id.toString() === req.body.pixelId)
        res.galleryItem.pixels[pixelIndex].color = req.body.newColor
    }
    try{
        const updatedGalleryItem = await res.galleryItem.save()
        res.json(updatedGalleryItem)
    } catch (err) {
        res.status(400).json({ message: err.message })
        console.log(err)
    }
})

// update width in galleryItem
router.patch('/width/:id', getGalleryItem, async (req, res) => {
    if (req.body.newWidth != null) {
        res.galleryItem.width = req.body.newWidth
    }
    try{
        const updatedGalleryItem = await res.galleryItem.save()
        res.json(updatedGalleryItem)
    } catch (err) {
        res.status(400).json({ message: err.message })
        console.log(err)
    }
})

// add a blank pixel to a galleryItem
router.patch('/addPixel/:id', getGalleryItem, async (req, res) => {
    const newPixel = new pixel()
    res.galleryItem.pixels.push(newPixel)
    try{
        const updatedGalleryItem = await res.galleryItem.save()
        res.json(updatedGalleryItem)
    } catch(err) {
        res.status(400).json({ message: err.message})
        console.log(err)
    }
})

// delete a pixel in galleryItem
router.patch('/deletePixel/:id', getGalleryItem, async (req, res) => {
    if ( req.body.pixelId != null) {
        const pixelIndex = res.galleryItem.pixels.findIndex(pixel => pixel._id.toString() === req.body.pixelId)
        res.galleryItem.pixels.splice(pixelIndex, 1)
    }
    try {
        const updatedGalleryItem = await res.galleryItem.save()
        res.json(updatedGalleryItem)
    } catch(err){
        res.status(400).json({ message: err.message})
        console.log(err)
    }
})

// update galleryItem's title
router.patch('/title/:id', getGalleryItem, async (req, res) => {
    if ( req.body.newTitle != null) {
        res.galleryItem.name = req.body.newTitle
    }
    try {
        const updatedGalleryItem = await res.galleryItem.save()
        res.json(updatedGalleryItem)
    } catch(err){
        res.status(400).json({ message: err.message})
        console.log(err)
    }
})

// update galleryItem's collab value
router.patch('/collab/:id', getGalleryItem, async (req, res) => {
    if ( req.body.collab != null) {
        res.galleryItem.collab = req.body.collab
    }
    try {
        const updatedGalleryItem = await res.galleryItem.save()
        res.json(updatedGalleryItem)
    } catch(err){
        res.status(400).json({ message: err.message})
        console.log(err)
    }
})

// fork a galleryItem, aka make a new copy of an existing galleryItem
router.post('/fork/:id', getGalleryItem, async (req, res) => {
    const gallery = new Gallery({
        name: req.body.name,
        width: res.galleryItem.width,
        pixels: res.galleryItem.pixels,
        authors: req.body.authors,
        date: new Date().toISOString(),
        id: nanoid(),
        collab: req.body.collab,
    })
    try{
        const newGallery = await gallery.save()
        res.status(201).json(newGallery)
    } catch(err){
        res.status(400).json({ message: err.message })
    }
})

async function getGalleryItem(req, res, next) {
    let galleryItem
    try{
        galleryItem = await Gallery.findById(req.params.id)
        if (galleryItem == null) {
            return res.status(404).json({ message: "Cannot find gallery item with that id" })
        }
    } catch(err){
        return res.status(500).json({ message: err.message })
    }
    res.galleryItem = galleryItem
    next()
}

module.exports = router