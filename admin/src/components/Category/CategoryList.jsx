import React from 'react';
import { BsTrash3, BsPencil } from 'react-icons/bs';
import './Category.css';

const CategoryList = ({ categories, openEditModal, openModal, url }) => {
    return (
        <div className="category-table">
            <div className="category-table-format title">
                <b>Item</b>
                <b>Name</b>
                <b>Description</b>
                <b>Action</b>
            </div>
            {categories.map((item, index) => (
                <div key={index} className='category-table-format'>
                    <img src={`${url}/images/` + item.image} alt="" />
                    <p>{item.name}</p>
                    <p>{item.description}</p>
                    <div className='actions'>
                        <p onClick={() => openEditModal(item)} className='cursor'><BsPencil /></p>
                        <p onClick={() => openModal(item._id)} className='cursor'><BsTrash3 /></p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CategoryList;
