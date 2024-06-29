import React from 'react';
import { BsTrash3, BsPencil } from 'react-icons/bs';
import './Food.css';

const FoodList = ({ foods, openEditModal, openModal, url }) => {
    return (
        <div className="list-table">
            <div className="list-table-format title">
                <b>Item</b>
                <b>Name</b>
                <b>Category</b>
                <b>Price</b>
                <b>Action</b>
            </div>
            {foods.map((item, index) => (
                <div key={index} className='list-table-format'>
                    <img src={`${url}/images/` + item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p>{item.category ? item.category.name : ''}</p>
                    <p>{item.price}</p>
                    <div className='actions'>
                        <p onClick={() => openEditModal(item)} className='cursor'><BsPencil /></p>
                        <p onClick={() => openModal(item._id)} className='cursor'><BsTrash3 /></p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FoodList;
