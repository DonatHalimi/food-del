import categoryModel from '../models/categoryModel.js'
import foodModel from '../models/foodModel.js'
import fs from 'fs'

// add category item
const addCategory = async (req, res) => {
    let image_filename = `${req.file.filename}`

    const category = new categoryModel({
        name: req.body.name,
        description: req.body.description,
        image: image_filename
    })

    try {
        await category.save()
        res.json({ success: true, message: "Category added successfully" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Error adding category' })
    }
}

// list category items
const listCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find({})
        res.json({ success: true, data: categories })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Error listing category items' })
    }
}

// remove category item
const removeCategory = async (req, res) => {
    try {
        const categoryId = req.body.id

        // Check if any food items are linked to this category
        const linkedFoods = await foodModel.find({ category: categoryId })
        if (linkedFoods.length > 0) {
            return res.json({ success: false, message: 'Cannot remove category linked with products' })
        }

        const category = await categoryModel.findById(categoryId)
        if (category.image) {
            fs.unlink(`uploads/${category.image}`, () => { })
        }

        await categoryModel.findByIdAndDelete(categoryId)
        res.json({ success: true, message: 'Category removed successfully' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Error removing category' })
    }
}

// Edit category item
const editCategory = async (req, res) => {
    try {
        const { _id, name, description } = req.body;
        let updateData = { name, description };

        // Check if a new image file is provided
        if (req.file) {
            // Find the existing category item to delete the old image
            const existingCategory = await categoryModel.findById(_id);
            if (existingCategory) {
                fs.unlink(`uploads/${existingCategory.image}`, () => { });
            }
            updateData.image = req.file.filename;
        }

        const updatedCategory = await categoryModel.findByIdAndUpdate(_id, updateData, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        res.json({ success: true, message: 'Category updated successfully', category: updatedCategory });
    } catch (error) {
        console.log('Error in editCategory:', error);
        res.status(500).json({ success: false, message: 'Error updating category' });
    }
};

export { addCategory, listCategories, removeCategory, editCategory }