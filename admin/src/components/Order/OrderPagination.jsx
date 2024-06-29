import React from 'react';
import './Order.css';

const OrderPagination = ({ currentPage, totalPages, paginate, nextPage, prevPage }) => {
    return (
        <div className="pagination-orders">
            <button className="pagination-orders-button" onClick={prevPage} disabled={currentPage === 1}>Previous</button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button key={index} className={`pagination-orders-button ${currentPage === index + 1 ? 'active' : ''}`} onClick={() => paginate(index + 1)}>
                    {index + 1}
                </button>
            ))}
            <button className="pagination-orders-button" onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
    );
};

export default OrderPagination;
