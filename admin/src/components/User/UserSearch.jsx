import React from 'react';
import './User.css';

const UserSearch = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className='user-search'>
            <input
                type='text'
                placeholder='Search users...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
};

export default UserSearch;