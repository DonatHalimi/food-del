import React from 'react';
import './Category.css';

const EditCategoryModal = ({ isEditModalOpen, closeEditModal, categoryToEdit, onEditInputChange, editCategory, currentImage, newImagePreview }) => {
    return (
        isEditModalOpen && (
            <div className="edit-modal">
                <div className="edit-modal-content">
                    <h2>Edit Category</h2>
                    <input
                        type="text"
                        name="name"
                        value={categoryToEdit.name}
                        onChange={onEditInputChange}
                        placeholder="Category name"
                    />
                    <textarea
                        name="description"
                        value={categoryToEdit.description}
                        onChange={onEditInputChange}
                        placeholder="Description"
                        id='category-edit-desc'
                    />
                    <div className="edit-food-image">
                        <p>Current Image</p>
                        <img src={currentImage} alt="Current category" />
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
                        <button onClick={closeEditModal} className="edit-modal-button" id='cancel-category'>Cancel</button>
                        <button onClick={editCategory} className="edit-modal-button" id='save-category'>Save</button>
                    </div>
                </div>
            </div>
        )
    );
};

export default EditCategoryModal;
