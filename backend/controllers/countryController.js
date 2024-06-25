import countryModel from '../models/countryModel.js'

// create a new country
const createCountry = async (req, res) => {
    try {
        const { name } = req.body

        const existingCountry = await countryModel.findOne({ name })
        if (existingCountry) {
            return res.status(400).json({ success: false, message: 'Country already exists' })
        }

        const newCountry = new countryModel({ name })
        await newCountry.save()

        res.json({ success: true, message: 'Country created successfully', country: newCountry })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Failed to create country' })
    }
}

// get all countries
const getAllCountries = async (req, res) => {
    try {
        const countries = await countryModel.find()
        res.json({ success: true, countries })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Failed to fetch countries' })
    }
}

// remove country
const removeCountry = async (req, res) => {
    try {
        await countryModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: 'Country removed successfully' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Error removing country' })
    }
}

export { createCountry, getAllCountries, removeCountry }