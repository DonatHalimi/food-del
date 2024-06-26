import categoryModel from '../models/categoryModel.js'
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
        const category = await categoryModel.findById(req.body.id)
        fs.unlink(`uploads/${category.image}`, () => { })

        await categoryModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: 'Category removed successfully' })
    } catch (error) {   
        console.log(error)
        res.json({ success: false, message: 'Error removing category' })
    }
}

export { addCategory, listCategories, removeCategory }