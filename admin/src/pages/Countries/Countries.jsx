import React, { useEffect, useState } from 'react';
import './Countries.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import { BsTrash3 } from 'react-icons/bs';

const Countries = ({ url }) => {
    const [list, setList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [countryIdToDelete, setCountryIdToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        fetchCountries();
    }, []);

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
                    <b>Action</b>
                </div>
                {currentItems.map((item, index) => (
                    <div key={index} className='country-table-format'>
                        <p>{item.name}</p>
                        <p onClick={() => openModal(item._id)} className='cursor'><BsTrash3 /></p>
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
        </div>
    );
};

export default Countries;