import cityModel from '../models/cityModel.js';

// create a new city
const createCity = async (req, res) => {
    try {
        const { name, country, zipcode } = req.body;

        const existingCity = await cityModel.findOne({ name });
        if (existingCity) {
            return res.status(400).json({ success: false, message: 'City already exists' });
        }

        const newCity = new cityModel({ name, country, zipcode });
        await newCity.save();

        res.json({ success: true, message: 'City created successfully', city: newCity });
    } catch (error) {
        console.error('Create City Error:', error);
        res.status(500).json({ success: false, message: 'Failed to create city' });
    }
};

// get all cities
const getAllCities = async (req, res) => {
    try {
        const cities = await cityModel.find().populate('country');
        res.json({ success: true, data: cities });
    } catch (error) {
        console.error('Get All Cities Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch cities' });
    }
};

// remove city
const removeCity = async (req, res) => {
    try {
        const { id } = req.body;
        await cityModel.findByIdAndDelete(id);
        res.json({ success: true, message: 'City removed successfully' });
    } catch (error) {
        console.error('Remove City Error:', error);
        res.status(500).json({ success: false, message: 'Error removing city' });
    }
};

// edit city
const editCity = async (req, res) => {
    try {
        const { _id, name, country, zipcode } = req.body;

        const updatedCity = await cityModel.findByIdAndUpdate(_id, { name, country, zipcode }, { new: true });

        if (!updatedCity) {
            return res.status(404).json({ success: false, message: 'City not found' });
        }

        res.json({ success: true, message: 'City updated successfully', city: updatedCity });
    } catch (error) {
        console.error('Edit City Error:', error);
        res.status(500).json({ success: false, message: 'Error updating city' });
    }
};

// get all cities for a country
const getCitiesByCountry = async (req, res) => {
    try {
        const { countryId } = req.params;
        const cities = await cityModel.find({ country: countryId });
        res.json({ success: true, data: cities });
    } catch (error) {
        console.error('Error fetching cities:', error);
        res.status(500).json({ success: false, message: 'Error fetching cities' });
    }
};

export { createCity, getAllCities, removeCity, editCity, getCitiesByCountry };