import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';

const Reviews = ({ foodId, url }) => {
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [food, setFood] = useState({});
    const { token } = useContext(StoreContext);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${url}/api/review/list/${foodId}`);
                if (response.data) {
                    setReviews(response.data.data);
                    setFood(response.data.food);
                }
            } catch (err) {
                console.error('Error fetching reviews:', err);
                setError('Error fetching reviews');
                setReviews([]);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [foodId, url]);

    const submitReview = async () => {
        try {
            await axios.post(`${url}/api/review/add`,
                { foodId, rating, comment },
                { headers: { Authorization: `Bearer ${token}` } });

            setRating(0);
            setComment('');
            const response = await axios.get(`${url}/api/review/list/${foodId}`);
            if (response.data) {
                setReviews(response.data.data);
                setFood(response.data.food);
            }
        } catch (err) {
            console.error('Error submitting review:', err);
            setError('Error submitting review');
        }
    };

    if (loading) {
        return <div>Loading reviews...</div>;
    }

    return (
        <div>
            <h2>Reviews</h2>
            {error && <div className="error">{error}</div>}
            <div>
                {reviews && reviews.length > 0 ? (
                    reviews.map(review => (
                        <div key={review._id}>
                            <strong>{review.user?.name || 'Anonymous'}</strong>
                            <span>{'★'.repeat(review.rating)}</span>
                            <p>{review.comment}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet</p>
                )}
            </div>
            <div>
                <h3>Add a review</h3>
                <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                    <option value={0} disabled>Select rating</option>
                    {[1, 2, 3, 4, 5].map(r => (
                        <option key={r} value={r}>{r}</option>
                    ))}
                </select>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write your review here" />
                <button onClick={submitReview}>Submit</button>
            </div>
            <div>
                <h3>Food Details</h3>
                <p>Average Rating: {food.averageRating?.toFixed(1)} ({food.numberOfReviews} reviews)</p>
            </div>
        </div>
    );
};

export default Reviews;
