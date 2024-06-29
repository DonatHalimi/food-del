import React from 'react';
import { BsTrash3, BsPencil } from 'react-icons/bs';
import './City.css';

const CityList = ({ cities, openEditModal, openModal }) => {
    return (
        <div className="city-table">
            <div className="city-table-format title">
                <b>Name</b>
                <b>Country</b>
                <b>Zipcode</b>
                <b>Actions</b>
            </div>
            {cities.length > 0 ? (
                cities.map((city, index) => (
                    <div key={index} className='city-table-format'>
                        <p>{city.name}</p>
                        <p>{city.country.name}</p>
                        <p>{city.zipcode}</p>
                        <div className='actions'>
                            <p onClick={() => openEditModal(city)} className='cursor'><BsPencil /></p>
                            <p onClick={() => openModal(city._id)} className='cursor'><BsTrash3 /></p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No city found</p>
            )}
        </div>
    );
};

export default CityList;
