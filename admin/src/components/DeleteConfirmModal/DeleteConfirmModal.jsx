import React from 'react';
import './DeleteConfirmModal.css';

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Confirm Deletion</h2>
                <p>Are you sure you want to delete this item?</p>
                <div className="modal-actions">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={onConfirm}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
