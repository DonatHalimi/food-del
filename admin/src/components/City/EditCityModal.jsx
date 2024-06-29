import React from 'react';
import './City.css';

const EditCityModal = ({ isEditModalOpen, closeEditModal, cityToEdit, handleEditInputChange, editCity, countries }) => {
    return (
        isEditModalOpen && (
            <div className="edit-modal">
                <div className="edit-modal-content">
                    <h2>Edit City</h2>
                    <input
                        type="text"
                        value={cityToEdit.name}
                        onChange={handleEditInputChange}
                        name="name"
                        placeholder="City name"
                    />
                    <select
                        value={cityToEdit.country._id}
                        onChange={handleEditInputChange}
                        name="country"
                    >
                        {countries.map((country) => (
                            <option key={country._id} value={country._id}>{country.name}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        value={cityToEdit.zipcode}
                        onChange={handleEditInputChange}
                        name="zipcode"
                        placeholder="Zipcode"
                    />
                    <div className="edit-modal-buttons">
                        <button onClick={closeEditModal} className="edit-modal-button" id='cancel-city'>Cancel</button>
                        <button onClick={editCity} className="edit-modal-button" id='save-city'>Save</button>
                    </div>
                </div>
            </div>
        )
    );
};

export default EditCityModal;
