import React, { forwardRef } from 'react';
import './Country.css';

const EditCountryModal = forwardRef(({ isEditModalOpen, closeEditModal, countryToEdit, setCountryToEdit, editCountry }, ref) => {
    return (
        isEditModalOpen && (
            <div className="edit-modal" ref={ref}>
                <div className="edit-modal-content">
                    <h2>Edit Country</h2>
                    <input
                        type="text"
                        value={countryToEdit.name}
                        onChange={(e) => setCountryToEdit({ ...countryToEdit, name: e.target.value })}
                    />
                    <div className="edit-modal-buttons">
                        <button onClick={closeEditModal} className="edit-modal-button" id='cancel-country'>Cancel</button>
                        <button onClick={editCountry} className="edit-modal-button" id='save-country'>Save</button>
                    </div>
                </div>
            </div>
        )
    );
});

export default EditCountryModal;
