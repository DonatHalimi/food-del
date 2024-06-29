import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import ConfirmModal from '../../../components/DeleteConfirmModal/DeleteConfirmModal';
import CityList from '../../../components/City/CityList';
import Pagination from '../../../components/Pagination/Pagination';
import CitySearch from '../../../components/City/CitySearch';
import EditCityModal from '../../../components/City/EditCityModal';
import 'react-toastify/dist/ReactToastify.css';

const Cities = ({ url }) => {
    const [cities, setCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [countries, setCountries] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cityIdToDelete, setCityIdToDelete] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [cityToEdit, setCityToEdit] = useState({ _id: '', name: '', country: '', zipcode: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 13;

    const editModalRef = useRef(null);
    const deleteModalRef = useRef(null);

    useEffect(() => {
        fetchCities();
        fetchCountries();
    }, []);

    useEffect(() => {
        filterCities();
    }, [searchTerm, cities]);

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
            toast.info("City ID copied to clipboard");
        }, (err) => {
            toast.error("Failed to copy city ID");
            console.error("Failed to copy text: ", err);
        });
    };

    const fetchCities = async () => {
        try {
            const response = await axios.get(`${url}/api/city/list`);
            if (response.data.success) {
                setCities(response.data.data);
                setFilteredCities(response.data.data);
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

    const filterCities = () => {
        const filtered = cities.filter(city =>
            city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            city.country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            city.zipcode.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCities(filtered);
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
    const currentCities = filteredCities.slice(indexOfFirstCity, indexOfLastCity);
    const totalPages = Math.ceil(filteredCities.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
    const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

    return (
        <div className='city add'>
            <div className='city-title-container'>
                <div className='city-title'>
                    <p>All Cities List</p>
                </div>
                <CitySearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <CityList cities={currentCities} openEditModal={openEditModal} openModal={openModal} />
            <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} nextPage={nextPage} prevPage={prevPage} />
            <ConfirmModal
                ref={deleteModalRef}
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={removeCity}
            />
            <EditCityModal
                ref={editModalRef}
                isEditModalOpen={isEditModalOpen}
                closeEditModal={closeEditModal}
                cityToEdit={cityToEdit}
                handleEditInputChange={handleEditInputChange}
                editCity={editCity}
                countries={countries}
            />
            <ToastContainer />
        </div>
    );
};

export default Cities;
