import express from 'express';
import { addReview, getReviews } from '../controllers/reviewController.js';
import authMiddleware from '../middleware/auth.js';

const reviewRouter = express.Router();

reviewRouter.post("/add", authMiddleware, addReview);
reviewRouter.get("/:foodId", getReviews);

export default reviewRouter;