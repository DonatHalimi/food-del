import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../../components/FoodItem/FoodItem';
import './SearchResults.css';
import Pagination from '../../../../admin/src/components/Pagination/Pagination'
import FoodSkeleton from '../../components/Skeleton/Food/FoodSkeleton';

const SearchResults = () => {
    const { food_list } = useContext(StoreContext);
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search).get('query') || '';
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15);
    const [loading, setLoading] = useState(true);

    const filteredProducts = food_list.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        setLoading(true);
        setCurrentPage(1);

        setTimeout(() => setLoading(false), 1000);
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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const totalFilteredProducts = filteredProducts.length > 1 ? 'products' : 'product';

    return (
        <div className="food-display">
            <div className="back-arrow" onClick={() => navigate(-1)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 19L8 12L15 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <h2>{filteredProducts.length} {totalFilteredProducts} found for '{query}'</h2>
            <div className="food-display-list">
                {loading ? (
                    Array.from({ length: itemsPerPage }).map((_, index) => <FoodSkeleton key={index} />)
                ) : (
                    currentItems.map(product => (
                        <FoodItem
                            key={product._id}
                            id={product._id}
                            name={product.name}
                            price={product.price}
                            description={product.description}
                            image={product.image}
                        />
                    ))
                )}
            </div>
            {filteredProducts.length === 0 && !loading && (
                <p>No products found for '{query}'</p>
            )}
            {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} nextPage={nextPage} prevPage={prevPage} />
            )}
        </div>
    );
};

export default SearchResults;