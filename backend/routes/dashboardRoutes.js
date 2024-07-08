import express from 'express';
import {
    getUserCount,
    getOrderCount,
    getTotalRevenue,
    getProductCategoryData
} from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/users/count', getUserCount);
router.get('/orders/count', getOrderCount);
router.get('/revenue', getTotalRevenue);
router.get('/product-categories', getProductCategoryData);

export default router;
