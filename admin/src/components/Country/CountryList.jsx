import React from 'react';
import { BsTrash3, BsPencil } from 'react-icons/bs';
import './Country.css';

const CountryList = ({ countries, openEditModal, openModal }) => {
    return (
        <div className="country-table">
            <div className="country-table-format title">
                <b>Name</b>
                <b>Actions</b>
            </div>
            {countries.length > 0 ? (
                countries.map((item, index) => (
                    <div key={index} className='country-table-format'>
                        <p>{item.name}</p>
                        <div className='actions'>
                            <p onClick={() => openEditModal(item)} className='cursor'><BsPencil /></p>
                            <p onClick={() => openModal(item._id)} className='cursor'><BsTrash3 /></p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No country found</p>
            )}
        </div>
    );
};

export default CountryList;
