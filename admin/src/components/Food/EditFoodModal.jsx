// components/EditFoodModal/EditFoodModal.js
import React from 'react';
import './Food.css';

const EditFoodModal = ({ isEditModalOpen, closeEditModal, foodToEdit, onEditInputChange, editFood, currentImage, newImagePreview, categories }) => {
    return (
        isEditModalOpen && (
            <div className="edit-modal">
                <div className="edit-modal-content">
                    <h2>Edit Food</h2>
                    <input
                        type="text"
                        name="name"
                        value={foodToEdit.name}
                        onChange={onEditInputChange}
                        placeholder="Food name"
                    />
                    <textarea
                        name="description"
                        value={foodToEdit.description}
                        onChange={onEditInputChange}
                        placeholder="Description"
                    />
                    <input
                        type="number"
                        name="price"
                        value={foodToEdit.price}
                        onChange={onEditInputChange}
                        placeholder="Price"
                    />
                    <select
                        name="category"
                        value={foodToEdit.category}
                        onChange={onEditInputChange}
                    >
                        {categories.map(category => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                    <div className="edit-food-image">
                        <p>Current Image</p>
                        <img src={currentImage} alt="Current food" />
                    </div>
                    <div className="edit-food-image">
                        <p>New Image</p>
                        <label className="custom-file-upload">
                            <input
                                type="file"
                                name="image"
                                onChange={onEditInputChange}
                                accept="image/*"
                            />
                            Choose File
                        </label>
                        {newImagePreview && (
                            <>
                                <p>Preview</p>
                                <img src={newImagePreview} alt="New preview" />
                            </>
                        )}
                    </div>
                    <div className="edit-modal-buttons">
                        <button onClick={closeEditModal} className="edit-modal-button" id='cancel-food'>Cancel</button>
                        <button onClick={editFood} className="edit-modal-button" id='save-food'>Save</button>
                    </div>
                </div>
            </div>
        )
    );
};

export default EditFoodModal;
