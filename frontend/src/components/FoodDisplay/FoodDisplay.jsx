import React, { useContext, useState, useEffect } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import Pagination from '../../../../admin/src/components/Pagination/Pagination'
import FoodSkeleton from '../Skeleton/Food/FoodSkeleton';

const FoodDisplay = () => {
    const { food_list, selectedCategory } = useContext(StoreContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15);
    const [sortBy, setSortBy] = useState('popularity');
    const [order, setOrder] = useState('asc');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        setTimeout(() => setLoading(false), 1000);
    }, [selectedCategory, sortBy, order]);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, sortBy, order]);

    const sortAndFilterFoodList = () => {
        let filteredList = selectedCategory === 'All'
            ? food_list
            : food_list.filter(item => item.category.name === selectedCategory);

        filteredList = filteredList.sort((a, b) => {
            if (sortBy === 'popularity') {
                return b.popularity - a.popularity;
            } else {
                if (a[sortBy] < b[sortBy]) return order === 'asc' ? -1 : 1;
                if (a[sortBy] > b[sortBy]) return order === 'asc' ? 1 : -1;
                return 0;
            }
        });

        return filteredList;
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        if (value === 'popularity') {
            setSortBy('popularity');
            setOrder('asc');
        } else {
            const [sortField, sortOrder] = value.split(',');
            setSortBy(sortField);
            setOrder(sortOrder);
        }
    };

    const filteredList = sortAndFilterFoodList();
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredList.length / itemsPerPage);

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
        <div className='food-display' id='food-display'>
            <div className="food-display-header">
                <h2>Top dishes near you</h2>
                <div className="sort-options">
                    <select onChange={handleSortChange} value={sortBy === 'popularity' ? 'popularity' : `${sortBy},${order}`}>
                        <option value="popularity" disabled>Sort By</option>
                        <option value="name,asc">Name (A-Z)</option>
                        <option value="name,desc">Name (Z-A)</option>
                        <option value="price,asc">Price (Low to High)</option>
                        <option value="price,desc">Price (High to Low)</option>
                    </select>
                </div>
            </div>
            <div className="food-display-list">
                {loading ? (
                    Array.from({ length: filteredList.length }).map((_, index) => <FoodSkeleton key={index} />)
                ) : (
                    currentItems.map((item, index) => (
                        <FoodItem
                            key={index}
                            id={item._id}
                            name={item.name}
                            description={item.description}
                            price={item.price}
                            image={item.image}
                        />
                    ))
                )}
            </div>
            {totalPages > 1 && !loading && (
                <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} nextPage={nextPage} prevPage={prevPage} />
            )}
        </div>
    );
};

export default FoodDisplay;
