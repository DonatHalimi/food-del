import React from 'react';
import './Order.css';

const OrderSearch = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className='order-search'>
            <input
                type='text'
                placeholder='Search orders...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
};

export default OrderSearch;
