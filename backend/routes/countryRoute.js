import express from 'express'
import { createCountry, getAllCountries, removeCountry, editCountry } from '../controllers/countryController.js'

const countryRouter = express.Router()

countryRouter.post('/add', createCountry)
countryRouter.get('/list', getAllCountries)
countryRouter.post('/remove', removeCountry)
countryRouter.post('/edit', editCountry)

export default countryRouter