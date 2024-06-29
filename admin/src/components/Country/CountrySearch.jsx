import React from 'react';
import './Country.css';

const CountrySearch = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className='country-search'>
            <input
                type='text'
                placeholder='Search countries...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
};

export default CountrySearch;
