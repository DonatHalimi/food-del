import React, { useState, useEffect } from 'react';
import { BsTrash3, BsPencil, BsX } from 'react-icons/bs';
import './Category.css';

const CategoryList = ({ categories, openEditModal, openModal, url }) => {
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
        <div className="category-table">
            <div className="category-table-format title">
                <b>Item</b>
                <b>Name</b>
                <b>Description</b>
                <b>Action</b>
            </div>
            {categories.map((item, index) => (
                <div key={index} className='category-table-format'>
                    <img
                        src={`${url}/images/` + item.image}
                        alt=""
                        onClick={() => openImageModal(`${url}/images/` + item.image)}
                        className='cursor'
                    />
                    <p>{item.name}</p>
                    <p>{item.description}</p>
                    <div className='actions'>
                        <p onClick={() => openEditModal(item)} className='cursor'><BsPencil /></p>
                        <p onClick={() => openModal(item._id)} className='cursor'><BsTrash3 /></p>
                    </div>
                </div>
            ))}

            {isImageModalOpen && (
                <div className="image-modal" onClick={closeImageModal}>
                    <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
                        <BsX className="close-icon" onClick={closeImageModal} />
                        <img src={selectedImage} alt="" className="modal-image" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryList;
