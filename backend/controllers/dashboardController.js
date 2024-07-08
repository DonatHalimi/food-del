import userModel from '../models/userModel.js';
import orderModel from '../models/orderModel.js';
import categoryModel from '../models/categoryModel.js';
import foodModel from '../models/foodModel.js';

// Get total number of users
export const getUserCount = async (req, res) => {
    try {
        const count = await userModel.countDocuments();
        res.json({ success: true, count });
    } catch (error) {
        console.error('Error fetching user count:', error);
        res.status(500).json({ success: false, message: 'Error fetching user count' });
    }
};

// Get total number of orders
export const getOrderCount = async (req, res) => {
    try {
        const count = await orderModel.countDocuments();
        res.json({ success: true, count });
    } catch (error) {
        console.error('Error fetching order count:', error);
        res.status(500).json({ success: false, message: 'Error fetching order count' });
    }
};

// Get total revenue
export const getTotalRevenue = async (req, res) => {
    try {
        const orders = await orderModel.find();
        const total = orders.reduce((acc, order) => acc + order.amount, 0);
        res.json({ success: true, total });
    } catch (error) {
        console.error('Error fetching total revenue:', error);
        res.status(500).json({ success: false, message: 'Error fetching total revenue' });
    }
};

// Get product category data
export const getProductCategoryData = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        const categoryDataPromises = categories.map(async (category) => {
            const count = await foodModel.countDocuments({ category: category._id });
            return { name: category.name, count };
        });

        const categoryData = await Promise.all(categoryDataPromises);

        const labels = categoryData.map(item => item.name);
        const data = categoryData.map(item => item.count);

        res.json({ success: true, labels, data });
    } catch (error) {
        console.error('Error fetching product category data:', error);
        res.status(500).json({ success: false, message: 'Error fetching product category data' });
    }
};