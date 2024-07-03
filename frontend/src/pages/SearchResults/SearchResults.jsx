import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../../components/FoodItem/FoodItem';
import './SearchResults.css';
import { ToastContainer } from 'react-toastify';

const SearchResults = () => {
    const { food_list } = useContext(StoreContext);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query') || '';
    const filteredProducts = food_list.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
    );
    const numberOfProducts = filteredProducts.length;

    return (
        <div className="food-display">
            <h2>{numberOfProducts} {numberOfProducts === 1 ? 'product' : 'products'} found for '{query}'</h2>
            <div className="food-display-list">
                {filteredProducts.map(product => (
                    <FoodItem
                        key={product._id}
                        id={product._id}
                        name={product.name}
                        price={product.price}
                        description={product.description}
                        image={product.image}
                    />
                ))}
                {numberOfProducts === 0 && (
                    <p>No products found for "{query}"</p>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default SearchResults;
