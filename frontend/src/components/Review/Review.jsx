import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Review = ({ foodId, url }) => {
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const { data } = await axios.get(`${url}/api/reviews/list/${foodId}`);
                setReviews(data.data);
            } catch (err) {
                setError('Error fetching reviews');
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [foodId, url]);

    const submitReview = async () => {
        try {
            await axios.post(`${url}/api/reviews/add`, { foodId, rating, comment });
            setRating(0);
            setComment('');
            const { data } = await axios.get(`${url}/api/reviews/list/${foodId}`);
            setReviews(data.data);
        } catch (err) {
            setError('Error submitting review');
            console.error('Error submitting review:', err);
        }
    };

    if (loading) {
        return <div>Loading reviews...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Reviews</h2>
            <div>
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <div key={review._id}>
                            <strong>{review.user.name}</strong>
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
                    <option value="" disabled>Select rating</option>
                    {[1, 2, 3, 4, 5].map(r => (
                        <option key={r} value={r}>{r}</option>
                    ))}
                </select>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write your review here" />
                <button onClick={submitReview}>Submit</button>
            </div>
        </div>
    );
};

export default Review;
