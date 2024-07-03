import foodModel from '../models/foodModel.js';
import fs from 'fs';

// add food item
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food added successfully" });
    } catch (error) {
        console.log('Error in addFood:', error);
        res.status(500).json({ success: false, message: 'Error adding food' });
    }
};

// server/controllers/foodController.js
const listFood = async (req, res) => {
    try {
        const sortBy = req.query.sortBy || 'popularity';
        const order = req.query.order === 'desc' ? -1 : 1;

        let sortCriteria;
        if (sortBy === 'popularity') {
            sortCriteria = { popularity: order };
        } else {
            sortCriteria = { [sortBy]: order };
        }

        const foods = await foodModel.find({})
            .populate('category', 'name description')
            .sort(sortCriteria);

        res.json({ success: true, data: foods });
    } catch (error) {
        console.log('Error in listFood:', error);
        res.status(500).json({ success: false, message: 'Error listing food items' });
    }
};

// remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => { });

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: 'Food removed successfully' });
    } catch (error) {
        console.log('Error in removeFood:', error);
        res.status(500).json({ success: false, message: 'Error removing food' });
    }
};

// edit food item
const editFood = async (req, res) => {
    try {
        const { _id, name, description, price, category } = req.body;
        let updateData = { name, description, price, category };

        // Check if a new image file is provided
        if (req.file) {
            // Find the existing food item to delete the old image
            const existingFood = await foodModel.findById(_id);
            if (existingFood) {
                fs.unlink(`uploads/${existingFood.image}`, () => { });
            }
            updateData.image = req.file.filename;
        }

        const updatedFood = await foodModel.findByIdAndUpdate(_id, updateData, { new: true });

        if (!updatedFood) {
            return res.status(404).json({ success: false, message: 'Food not found' });
        }

        res.json({ success: true, message: 'Food updated successfully', food: updatedFood });
    } catch (error) {
        console.log('Error in editFood:', error);
        res.status(500).json({ success: false, message: 'Error updating food' });
    }
};

export { addFood, listFood, removeFood, editFood };