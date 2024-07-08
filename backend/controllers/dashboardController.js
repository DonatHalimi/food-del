import userModel from '../models/userModel.js';
import orderModel from '../models/orderModel.js';

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

// Get user growth data
export const getUserGrowth = async (req, res) => {
    try {
        // Simulate user growth data (You should replace this with your actual logic)
        const labels = ['January', 'February', 'March', 'April', 'May', 'June'];
        const data = [50, 100, 150, 200, 250, 300];  // Replace with real data

        res.json({ success: true, labels, data });
    } catch (error) {
        console.error('Error fetching user growth data:', error);
        res.status(500).json({ success: false, message: 'Error fetching user growth data' });
    }
};

// Get revenue trend data
export const getRevenueTrend = async (req, res) => {
    try {
        // Simulate revenue trend data (You should replace this with your actual logic)
        const labels = ['January', 'February', 'March', 'April', 'May', 'June'];
        const data = [1000, 2000, 3000, 4000, 5000, 6000];  // Replace with real data

        res.json({ success: true, labels, data });
    } catch (error) {
        console.error('Error fetching revenue trend data:', error);
        res.status(500).json({ success: false, message: 'Error fetching revenue trend data' });
    }
};
