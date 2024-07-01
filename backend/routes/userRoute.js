import express from 'express'
import { registerUser, loginUser, getAllUsers, removeUser, editUser, createUser } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/add', createUser)
userRouter.get('/list', getAllUsers)
userRouter.post('/remove', removeUser)
userRouter.post('/edit', editUser)

export default userRouter