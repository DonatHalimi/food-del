import React from 'react';
import { BsPencil, BsTrash3 } from 'react-icons/bs';
import './User.css';

const UserList = ({ users, openEditModal, openModal }) => {
    return (
        <div className="user-table">
            <div className="user-table-format title">
                <b>Name</b>
                <b>Email</b>
                <b>Password</b>
                <b>Actions</b>
            </div>
            {users.length > 0 ? (
                users.map((item, index) => (
                    <div key={index} className='user-table-format'>
                        <p>{item.name}</p>
                        <p>{item.email}</p>
                        <p>●●●●●●●●●●</p>
                        <div className='actions'>
                            <p onClick={() => openEditModal(item)} className='cursor'><BsPencil /></p>
                            <p onClick={() => openModal(item._id)} className='cursor'><BsTrash3 /></p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No user found</p>
            )}
        </div>
    );
};

export default UserList;

