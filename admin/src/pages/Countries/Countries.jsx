import React, { useEffect, useState } from 'react';
import './Countries.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import { BsTrash3, BsPencil } from 'react-icons/bs';

const Countries = ({ url }) => {
    const [list, setList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [countryIdToDelete, setCountryIdToDelete] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [countryToEdit, setCountryToEdit] = useState({ id: '', name: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        fetchCountries();
    }, []);

    useEffect(() => {
        if (isEditModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isEditModalOpen]);

    const fetchCountries = async () => {
        try {
            const response = await axios.get(`${url}/api/country/list`);
            if (response.data.success) {
                setList(response.data.countries);
            } else {
                toast.error("Error fetching country list");
            }
        } catch (error) {
            toast.error("Error fetching country list");
            console.error('Error fetching country list:', error);
        }
    };

    const removeCountry = async () => {
        try {
            const response = await axios.post(`${url}/api/country/remove`, { id: countryIdToDelete });
            await fetchCountries();
            setIsModalOpen(false);

            if (response.data.success) {
                toast.success(response.data.message);
            } else {
                toast.error("Error while deleting country");
            }
        } catch (error) {
            toast.error("Error while deleting country");
            console.error('Error while deleting country:', error);
        }
    };

    const openModal = (countryId) => {
        setCountryIdToDelete(countryId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openEditModal = (country) => {
        setCountryToEdit(country);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const editCountry = async () => {
        try {
            const response = await axios.post(`${url}/api/country/edit`, countryToEdit);
            await fetchCountries();
            setIsEditModalOpen(false);

            if (response.data.success) {
                toast.success(response.data.message);
            } else {
                toast.error("Error while updating country");
            }
        } catch (error) {
            toast.error("Error while updating country");
            console.error('Error while updating country:', error);
        }
    };

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(list.length / itemsPerPage);

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
        <div className='country add'>
            <div className='country-title'>
                <p>All Countries List</p>
            </div>
            <div className="country-table">
                <div className="country-table-format title">
                    <b>Name</b>
                    <b>Actions</b>
                </div>
                {currentItems.map((item, index) => (
                    <div key={index} className='country-table-format'>
                        <p>{item.name}</p>
                        <div className='actions'>
                            <p onClick={() => openEditModal(item)} className='cursor'><BsPencil /></p>
                            <p onClick={() => openModal(item._id)} className='cursor'><BsTrash3 /></p>
                        </div>
                    </div>
                ))}
            </div>
            {/* Pagination Controls */}
            <div className="pagination">
                <button className="pagination-button" onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index} className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </button>
                ))}
                <button className="pagination-button" onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={removeCountry}
            />
            {isEditModalOpen && (
                <div className="edit-modal">
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
            )}
        </div>
    );
};

export default Countries;