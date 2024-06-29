// components/CategoryPagination/CategoryPagination.js
import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, paginate, nextPage, prevPage }) => {
    return (
        <div className="pagination">
            <button className="pagination-button" onClick={prevPage} disabled={currentPage === 1}>Previous</button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button key={index} className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`} onClick={() => paginate(index + 1)}>
                    {index + 1}
                </button>
            ))}
            <button className="pagination-button" onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
    );
};

export default Pagination;
