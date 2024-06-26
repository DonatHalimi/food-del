import foodModel from '../models/foodModel.js'
import fs from 'fs'

// add food item
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`

    console.log('Incoming food data:', {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category, 
        image: image_filename
    });

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })

    try {
        await food.save()
        res.json({ success: true, message: "Food added successfully" })
    } catch (error) {
        console.log('Error in addFood:', error)
        res.status(500).json({ success: false, message: 'Error adding food' })
    }
}

// list food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({}).populate('category', 'name description')
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log('Error in listFood:', error)
        res.status(500).json({ success: false, message: 'Error listing food items' })
    }
}

// remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`, () => { })

        await foodModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: 'Food removed successfully' })
    } catch (error) {
        console.log('Error in removeFood:', error)
        res.status(500).json({ success: false, message: 'Error removing food' })
    }
}

export { addFood, listFood, removeFood }