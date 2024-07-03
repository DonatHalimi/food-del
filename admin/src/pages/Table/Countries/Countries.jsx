import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import ConfirmModal from '../../../components/DeleteConfirmModal/DeleteConfirmModal';
import CountryList from '../../../components/Country/CountryList';
import CountrySearch from '../../../components/Country/CountrySearch';
import Pagination from '../../../components/Pagination/Pagination';
import EditCountryModal from '../../../components/Country/EditCountryModal';

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

    const editModalRef = useRef(null);
    const deleteModalRef = useRef(null);

    useEffect(() => {
        fetchCountries();
    }, []);

    useEffect(() => {
        filterCountries();
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
                <CountrySearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <CountryList countries={currentItems} openEditModal={openEditModal} openModal={openModal} />
            {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} nextPage={nextPage} prevPage={prevPage} />
            )}
            <ConfirmModal
                ref={deleteModalRef}
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={removeCountry}
            />
            <EditCountryModal
                ref={editModalRef}
                isEditModalOpen={isEditModalOpen}
                closeEditModal={closeEditModal}
                countryToEdit={countryToEdit}
                setCountryToEdit={setCountryToEdit}
                editCountry={editCountry}
            />
            <ToastContainer />
        </div>
    );
};

export default Countries;
