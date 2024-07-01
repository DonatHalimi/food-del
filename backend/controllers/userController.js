import userModel from "../models/userModel.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body

    try {
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: 'Email already exists' })
        }
        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Please enter a valid email' })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: 'Please enter a strong password' })
        }

        // hashing user password 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({ success: true, token })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Error registering user' })
    }
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const token = createToken(user._id)
        res.json({ success: true, token })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error logging user in" })
    }
}

// create a new user
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await userModel.findOne({ name, email, password });
        if (existingUser) {
            return res.json({ success: false, message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });
        
        await newUser.save();

        res.json({ success: true, message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Create User Error:', error);
        res.json({ success: false, message: 'Failed to create user' });
    }
};

// get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.json({ success: true, users });
    } catch (error) {
        console.error('Get All Users Error:', error);
        res.json({ success: false, message: 'Failed to fetch users' });
    }
};

// remove user
const removeUser = async (req, res) => {
    try {
        const { id } = req.body;
        await userModel.findByIdAndDelete(id);
        res.json({ success: true, message: 'User removed successfully' });
    } catch (error) {
        console.error('Remove User Error:', error);
        res.json({ success: false, message: 'Error removing User' });
    }
};

// edit user
const editUser = async (req, res) => {
    try {
        const { _id, name, email, password } = req.body;

        const updatedUser = await userModel.findByIdAndUpdate(_id, { name, email, password }, { new: true });

        if (!updatedUser) {
            return res.json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, message: 'User updated successfully', country: updatedUser });
    } catch (error) {
        console.error('Edit User Error:', error);
        res.json({ success: false, message: 'Error updating user' });
    }
};

export { registerUser, loginUser, createUser, getAllUsers, removeUser, editUser }