import express from 'express'
import { addFood, listFood, removeFood } from '../controllers/foodController.js'
import { listCategories } from '../controllers/categoryController.js'
import multer from 'multer'

const foodRouter = express.Router();

// image storage engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

foodRouter.post("/add", upload.single("image"), addFood)
foodRouter.get("/list", listFood)
foodRouter.post("/remove", removeFood)

// Category routes
foodRouter.get('/category/list', listCategories);

export default foodRouter;