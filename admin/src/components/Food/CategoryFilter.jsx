import React from 'react';
import './Food.css';

const CategoryFilter = ({ categories, selectedCategory, setSelectedCategory, url }) => {
    const handleCategoryClick = (categoryName) => {
        setSelectedCategory(prev => prev === categoryName ? 'All' : categoryName);
    };

    return (
        <div className='category-filter'>
            {categories.map((category, index) => (
                <div
                    key={index}
                    className={selectedCategory === category.name ? 'active' : ''}
                    onClick={() => handleCategoryClick(category.name)}
                >
                    <img
                        className={selectedCategory === category.name ? "active" : ""}
                        src={`${url}/images/` + category.image}
                        alt={category.name}
                    />
                    <p>{category.name}</p>
                </div>
            ))}
            <div
                className={selectedCategory === 'All' ? 'active' : ''}
                onClick={() => setSelectedCategory('All')}
            >
            </div>
        </div>
    );
};

export default CategoryFilter;
