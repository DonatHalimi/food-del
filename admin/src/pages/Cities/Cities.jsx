import React, { useEffect, useState } from 'react';
import './Cities.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import { BsTrash3, BsPencil } from 'react-icons/bs';

const Cities = ({ url }) => {
    const [cities, setCities] = useState([]);
    const [countries, setCountries] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cityIdToDelete, setCityIdToDelete] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [cityToEdit, setCityToEdit] = useState({ _id: '', name: '', country: '', zipcode: '' });

    // Pagination state variables
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 13;

    useEffect(() => {
        fetchCities();
        fetchCountries();
    }, []);

    const fetchCities = async () => {
        try {
            const response = await axios.get(`${url}/api/city/list`);
            if (response.data.success) {
                setCities(response.data.data);
            } else {
                toast.error("Error fetching city list");
            }
        } catch (error) {
            toast.error("Error fetching city list");
            console.error('Error fetching city list:', error);
        }
    };

    const fetchCountries = async () => {
        try {
            const response = await axios.get(`${url}/api/country/list`);
            if (response.data.success) {
                setCountries(response.data.countries);
            } else {
                toast.error("Error fetching country list");
            }
        } catch (error) {
            toast.error("Error fetching country list");
            console.error('Error fetching country list:', error);
        }
    };

    const removeCity = async () => {
        try {
            const response = await axios.post(`${url}/api/city/remove`, { id: cityIdToDelete });
            await fetchCities();
            setIsModalOpen(false);

            if (response.data.success) {
                toast.success(response.data.message, {
                    closeOnClick: true
                });
            } else {
                toast.error("Error while deleting city", {
                    closeOnClick: true
                });
            }
        } catch (error) {
            toast.error("Error deleting city for city ID: " + cityIdToDelete);
            console.error('Error while deleting city:', error);
        }
    };

    const openModal = (cityId) => {
        setCityIdToDelete(cityId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openEditModal = (city) => {
        setCityToEdit(city);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const editCity = async () => {
        try {
            const response = await axios.post(`${url}/api/city/edit`, cityToEdit);
            await fetchCities();
            setIsEditModalOpen(false);

            if (response.data.success) {
                toast.success(response.data.message, {
                    closeOnClick: true
                });
            } else {
                toast.error("Error while updating city", {
                    closeOnClick: true
                });
            }
        } catch (error) {
            toast.error("Error updating city for city ID: " + cityToEdit._id);
            console.error('Error while updating city:', error);
        }
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setCityToEdit({ ...cityToEdit, [name]: value });
    };

    // Pagination logic
    const indexOfLastCity = currentPage * itemsPerPage;
    const indexOfFirstCity = indexOfLastCity - itemsPerPage;
    const currentCities = cities.slice(indexOfFirstCity, indexOfLastCity);
    const totalPages = Math.ceil(cities.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
    const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

    return (
        <div className='category add'>
            <div className='category-title'>
                <p>All Cities List</p>
            </div>
            <div className="category-table">
                <div className="category-table-format title">
                    <b>Name</b>
                    <b>Country</b>
                    <b>Zipcode</b>
                    <b>Actions</b>
                </div>
                {currentCities.map((city, index) => (
                    <div key={index} className='category-table-format'>
                        <p>{city.name}</p>
                        <p>{city.country.name}</p>
                        <p>{city.zipcode}</p>
                        <div className='actions'>
                            <p onClick={() => openEditModal(city)} className='cursor'><BsPencil /></p>
                            <p onClick={() => openModal(city._id)} className='cursor'><BsTrash3 /></p>
                        </div>
                    </div>
                ))}
            </div>
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
                onConfirm={removeCity}
            />
            {isEditModalOpen && (
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
            )}
            <ToastContainer />
        </div>
    );
};

export default Cities;
