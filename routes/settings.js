const express = require('express')
const router = express.Router()
const Settings = require('../models/settings')

// get settings
router.get('/', async (req, res) => {
    try{
        const settings = await Settings.find()
        res.json(settings)
    } catch(err){
        res.status(400).json({ message: err.message})
    }
})

module.exports = router