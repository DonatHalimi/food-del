import React from 'react';
import './OrderSkeleton.css';

const OrderSkeleton = () => {
    return (
        <div className="order-skeleton">
            <div className="order-skeleton-image"></div>
            <div className="order-skeleton-description"></div>
            <div className="order-skeleton-amount"></div>
            <div className="order-skeleton-items"></div>
            <div className="order-skeleton-status"></div>
            <div className="order-skeleton-button"></div>
        </div>
    );
};

export default OrderSkeleton;