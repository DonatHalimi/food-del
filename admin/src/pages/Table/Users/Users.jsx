import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import ConfirmModal from '../../../components/DeleteConfirmModal/DeleteConfirmModal';
import UserList from '../../../components/User/UserList';
import UserSearch from '../../../components/User/UserSearch';
import Pagination from '../../../components/Pagination/Pagination';
import EditUserModal from '../../../components/User/EditUserModal';

const Users = ({ url }) => {
    const [list, setList] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState({ id: '', name: '', email: '', password: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const editModalRef = useRef(null);
    const deleteModalRef = useRef(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        filterUsers();
    }, [searchTerm]);

    useEffect(() => {
        if (isEditModalOpen || isModalOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleEscKey);
        } else {
            document.body.style.overflow = 'auto';
            window.removeEventListener('keydown', handleEscKey);
        }
        return () => {
            window.removeEventListener('keydown', handleEscKey);
        };
    }, [isEditModalOpen, isModalOpen]);

    const handleEscKey = (event) => {
        if (event.key === 'Escape') {
            if (isEditModalOpen) {
                closeEditModal();
            }
            if (isModalOpen) {
                closeModal();
            }
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.info("User ID copied to clipboard");
        }, (err) => {
            toast.error("Failed to copy user ID");
            console.error("Failed to copy text: ", err);
        });
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${url}/api/user/list`);
            if (response.data.success) {
                setList(response.data.users);
                setFilteredUsers(response.data.users);
            } else {
                toast.error("Error fetching user list");
            }
        } catch (error) {
            toast.error("Error fetching user list");
            console.error('Error fetching user list:', error);
        }
    };

    const filterUsers = () => {
        const filtered = list.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    const removeUser = async () => {
        try {
            const response = await axios.post(`${url}/api/user/remove`, { id: userIdToDelete });
            await fetchUsers();
            setIsModalOpen(false);

            if (response.data.success) {
                toast.success(response.data.message, {
                    closeOnClick: true
                });
            } else {
                toast.error("Error while deleting user", {
                    closeOnClick: true
                });
            }
        } catch (error) {
            toast.error("Error deleting user for user ID: " + userIdToDelete, {
                onClick: () => copyToClipboard(userIdToDelete),
                style: {
                    cursor: "pointer"
                }
            });
            console.error('Error while deleting USER:', error);
        }
    };

    const openModal = (userId) => {
        setUserIdToDelete(userId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openEditModal = (user) => {
        setUserToEdit(user);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const editUser = async () => {
        try {
            const response = await axios.post(`${url}/api/user/edit`, userToEdit);
            await fetchUsers();
            setIsEditModalOpen(false);

            if (response.data.success) {
                toast.success(response.data.message, {
                    closeOnClick: true
                });
            } else {
                toast.error(response.data.message, {
                    closeOnClick: true
                });
            }
        } catch (error) {
            toast.error(error.response.data.message, {
                style: {
                    cursor: "pointer"
                }
            });
            console.error('Error while updating user:', error);
        }
    };

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className='user add'>
            <div className='user-title-container'>
                <div className='user-title'>
                    <p>All Users List</p>
                </div>
                <UserSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <UserList users={currentItems} openEditModal={openEditModal} openModal={openModal} />
            {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} nextPage={nextPage} prevPage={prevPage} />
            )}
            <ConfirmModal
                ref={deleteModalRef}
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={removeUser}
            />
            <EditUserModal
                ref={editModalRef}
                isEditModalOpen={isEditModalOpen}
                closeEditModal={closeEditModal}
                userToEdit={userToEdit}
                setUserToEdit={setUserToEdit}
                editUser={editUser}
            />
            <ToastContainer />
        </div>
    );
};

export default Users;
