import React, { useState, useEffect } from 'react';
import { BsTrash3, BsPencil, BsX } from 'react-icons/bs';
import './Food.css';

const FoodList = ({ foods, openEditModal, openModal, url }) => {
    const [isImageModalOpen, setImageModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const openImageModal = (image) => {
        setSelectedImage(image);
        setImageModalOpen(true);
    };

    const closeImageModal = () => {
        setImageModalOpen(false);
        setSelectedImage(null);
    };

    const handleEscKey = (event) => {
        if (event.key === 'Escape') {
            closeImageModal();
        }
    };

    useEffect(() => {
        if (isImageModalOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleEscKey);
        } else {
            document.body.style.overflow = 'auto';
            window.removeEventListener('keydown', handleEscKey);
        }
        return () => {
            window.removeEventListener('keydown', handleEscKey);
        };
    }, [isImageModalOpen]);

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
                    <img
                        src={`${url}/images/` + item.image}
                        alt={item.name}
                        onClick={() => openImageModal(`${url}/images/` + item.image)}
                        className='cursor'
                    />
                    <p>{item.name}</p>
                    <p>{item.category ? item.category.name : ''}</p>
                    <p>{item.price}</p>
                    <div className='actions'>
                        <p onClick={() => openEditModal(item)} className='cursor'><BsPencil /></p>
                        <p onClick={() => openModal(item._id)} className='cursor'><BsTrash3 /></p>
                    </div>
                </div>
            ))}

            {isImageModalOpen && (
                <div className="image-modal" onClick={closeImageModal}>
                    <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
                        <BsX className="close-icon-food" onClick={closeImageModal} />
                        <img src={selectedImage} alt="" className="modal-image" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoodList;
