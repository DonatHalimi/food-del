import React from 'react';
import './FoodSkeleton.css';

const FoodSkeleton = () => {
    return (
        <div className="skeleton">
            <div className="skeleton-image"></div>
            <div className="skeleton-info">
                <div className="skeleton-text skeleton-name"></div>
                <div className="skeleton-text skeleton-desc"></div>
                <div className="skeleton-text skeleton-price"></div>
            </div>
        </div>
    );
};

export default FoodSkeleton;