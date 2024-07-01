import React, { forwardRef, useState } from 'react';
import './User.css';

const EditUserModal = forwardRef(({ isEditModalOpen, closeEditModal, userToEdit, setUserToEdit, editUser }, ref) => {
    const passwordPlaceholder = '●●●●●●●●●●';
    const [showPasswordPlaceholder, setShowPasswordPlaceholder] = useState(true);

    const handlePasswordChange = (e) => {
        setUserToEdit({ ...userToEdit, password: e.target.value });
    };

    return (
        isEditModalOpen && (
            <div className="edit-modal" ref={ref}>
                <div className="edit-modal-content">
                    <h2>Edit User</h2>
                    <input
                        type="text"
                        value={userToEdit.name}
                        onChange={(e) => setUserToEdit({ ...userToEdit, name: e.target.value })}
                    />
                    <input
                        type="text"
                        value={userToEdit.email}
                        onChange={(e) => setUserToEdit({ ...userToEdit, email: e.target.value })}
                    />
                    <input
                        type="text"
                        value={showPasswordPlaceholder ? passwordPlaceholder : userToEdit.password}
                        onFocus={() => setShowPasswordPlaceholder(false)}
                        onBlur={() => setShowPasswordPlaceholder(true)}
                        onChange={handlePasswordChange}
                    />
                    <div className="edit-modal-buttons">
                        <button onClick={closeEditModal} className="edit-modal-button" id='cancel-country'>Cancel</button>
                        <button onClick={editUser} className="edit-modal-button" id='save-country'>Save</button>
                    </div>
                </div>
            </div>
        )
    );
});

export default EditUserModal;
