import express from 'express'
import { createCity, getAllCities, removeCity, editCity, getCitiesByCountry } from '../controllers/cityController.js'

const cityRouter = express.Router()

cityRouter.post('/add', createCity)
cityRouter.get('/list', getAllCities)
cityRouter.post('/remove', removeCity)
cityRouter.post('/edit', editCity)
cityRouter.get('/by-country/:countryId', getCitiesByCountry);

export default cityRouter