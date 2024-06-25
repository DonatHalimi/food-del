import express from 'express'
import { createCountry, getAllCountries, removeCountry } from '../controllers/countryController.js'

const countryRouter = express.Router()

countryRouter.post('/add', createCountry)
countryRouter.get('/list', getAllCountries)
countryRouter.post('/remove', removeCountry)

export default countryRouter