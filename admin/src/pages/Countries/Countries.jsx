import React, { useEffect, useState } from 'react';
import './Countries.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import { BsTrash3, BsPencil } from 'react-icons/bs';

const Countries = ({ url }) => {
    const [list, setList] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
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

    useEffect(() => {
        filterCountries();
    }, [searchTerm, list]);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.info("Category ID copied to clipboard");
        }, (err) => {
            toast.error("Failed to copy category ID");
            console.error("Failed to copy text: ", err);
        });
    };

    const fetchCountries = async () => {
        try {
            const response = await axios.get(`${url}/api/country/list`);
            if (response.data.success) {
                setList(response.data.countries);
                setFilteredCountries(response.data.countries);
            } else {
                toast.error("Error fetching country list");
            }
        } catch (error) {
            toast.error("Error fetching country list");
            console.error('Error fetching country list:', error);
        }
    };

    const filterCountries = () => {
        const filtered = list.filter(country =>
            country.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCountries(filtered);
    };

    const removeCountry = async () => {
        try {
            const response = await axios.post(`${url}/api/country/remove`, { id: countryIdToDelete });
            await fetchCountries();
            setIsModalOpen(false);

            if (response.data.success) {
                toast.success(response.data.message, {
                    closeOnClick: true
                });
            } else {
                toast.error("Error while deleting country", {
                    closeOnClick: true
                });
            }
        } catch (error) {
            toast.error("Error deleting country for country ID: " + countryIdToDelete._id, {
                onClick: () => copyToClipboard(countryIdToDelete._id),
                style: {
                    cursor: "pointer"
                }
            });
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
                toast.success(response.data.message, {
                    closeOnClick: true
                });
            } else {
                toast.error("Error while updating country", {
                    closeOnClick: true
                });
            }
        } catch (error) {
            toast.error("Error updating country for country ID: " + countryIdToDelete, {
                onClick: () => copyToClipboard(countryIdToDelete),
                style: {
                    cursor: "pointer"
                }
            });
            console.error('Error while updating country:', error);
        }
    };

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCountries.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);

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
            <div className='country-title-container'>
                <div className='country-title'>
                    <p>All Countries List</p>
                </div>
                <div className='country-search'>
                    <input
                        type='text'
                        placeholder='Search countries...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
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
