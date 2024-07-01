import countryModel from '../models/countryModel.js';

// create a new country
const createCountry = async (req, res) => {
    try {
        const { name } = req.body;

        const existingCountry = await countryModel.findOne({ name });
        if (existingCountry) {
            return res.status(400).json({ success: false, message: 'Country already exists' });
        }

        const newCountry = new countryModel({ name });
        await newCountry.save();

        res.json({ success: true, message: 'Country created successfully', country: newCountry });
    } catch (error) {
        console.error('Create Country Error:', error);
        res.json({ success: false, message: 'Failed to create country' });
    }
};

// get all countries
const getAllCountries = async (req, res) => {
    try {
        const countries = await countryModel.find();
        res.json({ success: true, countries });
    } catch (error) {
        console.error('Get All Countries Error:', error);
        res.json({ success: false, message: 'Failed to fetch countries' });
    }
};

// remove country
const removeCountry = async (req, res) => {
    try {
        const { id } = req.body;
        await countryModel.findByIdAndDelete(id);
        res.json({ success: true, message: 'Country removed successfully' });
    } catch (error) {
        console.error('Remove Country Error:', error);
        res.json({ success: false, message: 'Error removing country' });
    }
};

// edit country
const editCountry = async (req, res) => {
    try {
        const { _id, name } = req.body;

        const updatedCountry = await countryModel.findByIdAndUpdate(_id, { name }, { new: true });

        if (!updatedCountry) {
            return res.status(404).json({ success: false, message: 'Country not found' });
        }

        res.json({ success: true, message: 'Country updated successfully', country: updatedCountry });
    } catch (error) {
        console.error('Edit Country Error:', error);
        res.json({ success: false, message: 'Error updating country' });
    }
};

export { createCountry, getAllCountries, removeCountry, editCountry };