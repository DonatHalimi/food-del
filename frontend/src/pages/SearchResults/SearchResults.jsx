import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../../components/FoodItem/FoodItem';
import './SearchResults.css';
import Pagination from '../../../../admin/src/components/Pagination/Pagination'

const SearchResults = () => {
    const { food_list } = useContext(StoreContext);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query') || '';
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15);
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
            </div>        {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} nextPage={nextPage} prevPage={prevPage} />
            )}
        </div>
    );
};

export default SearchResults;
