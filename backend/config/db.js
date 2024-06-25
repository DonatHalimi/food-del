import mongoose from "mongoose"

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://donat:33858627@cluster0.fxmyoyr.mongodb.net/food-del').then(() => console.log('DB Connected'))
}