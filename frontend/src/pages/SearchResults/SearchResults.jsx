import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../../components/FoodItem/FoodItem';
import './SearchResults.css';
import { ToastContainer } from 'react-toastify';

const SearchResults = () => {
    const { food_list } = useContext(StoreContext);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query') || '';
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20); 
    const filteredProducts = food_list.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [query, food_list]);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="food-display">
            <h2>{filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found for '{query}'</h2>
            <div className="food-display-list">
                {currentItems.map(product => (
                    <FoodItem
                        key={product._id}
                        id={product._id}
                        name={product.name}
                        price={product.price}
                        description={product.description}
                        image={product.image}
                    />
                ))}
                {filteredProducts.length === 0 && (
                    <p>No products found for "{query}"</p>
                )}
            </div>
            {totalPages > 1 && (
                <div className="pagination">
                    <button className="pagination-button" onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                            onClick={() => paginate(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button className="pagination-button" onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default SearchResults;
