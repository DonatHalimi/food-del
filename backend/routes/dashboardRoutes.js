import express from 'express';
import {
    getUserCount,
    getOrderCount,
    getTotalRevenue,
    getUserGrowth,
    getRevenueTrend
} from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/users/count', getUserCount);
router.get('/orders/count', getOrderCount);
router.get('/revenue', getTotalRevenue);
router.get('/users/growth', getUserGrowth);
router.get('/revenue/trend', getRevenueTrend);

export default router;
