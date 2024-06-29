import React from 'react';
import './City.css';

const CitySearch = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className='city-search'>
            <input
                type='text'
                placeholder='Search cities...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
};

export default CitySearch;
