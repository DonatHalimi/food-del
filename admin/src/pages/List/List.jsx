import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import { BsTrash3 } from 'react-icons/bs';
import { menu_list } from '../../../../frontend/src/assets/assets';

const List = ({ url }) => {
    const [list, setList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [foodIdToDelete, setFoodIdToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Transform menu_list to match categories structure
    const categories = menu_list.map(item => ({
        name: item.menu_name,
        image: item.menu_image
    }));

    useEffect(() => {
        fetchList();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory]);

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if (response.data.success) {
                setList(response.data.data);
            } else {
                toast.error("Error fetching food list");
            }
        } catch (error) {
            toast.error("Error fetching food list");
            console.error('Error fetching food list:', error);
        }
    };

    const removeFood = async () => {
        try {
            const response = await axios.post(`${url}/api/food/remove`, { id: foodIdToDelete });
            await fetchList();
            setIsModalOpen(false);

            if (response.data.success) {
                toast.success(response.data.message);
            } else {
                toast.error("Error while deleting product");
            }
        } catch (error) {
            toast.error("Error while deleting product");
            console.error('Error while deleting product:', error);
        }
    };

    const openModal = (foodId) => {
        setFoodIdToDelete(foodId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleCategoryClick = (categoryName) => {
        setSelectedCategory(prevCategory => prevCategory === categoryName ? 'All' : categoryName);
    };

    // Filtered list based on category
    const filteredList = selectedCategory === 'All' ? list : list.filter(item => item.category === selectedCategory);

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredList.length / itemsPerPage);

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
        <div className='list add'>
            <div className='list-title'>
                <p>All Foods List</p>
                <div className="category-filter">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className={selectedCategory === category.name ? 'active' : ''}
                            onClick={() => handleCategoryClick(category.name)}
                        >
                            <img className={selectedCategory === category.name ? "active" : ""} src={category.image} alt="" />
                            <p>{category.name}</p>
                        </div>
                    ))}
                    <div
                        className={selectedCategory === 'All' ? 'active' : ''}
                        onClick={() => setSelectedCategory('All')}
                    >
                    </div>
                </div>
            </div>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Item</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {currentItems.map((item, index) => (
                    <div key={index} className='list-table-format'>
                        <img src={`${url}/images/` + item.image} alt="" />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>{item.price}</p>
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
                onConfirm={removeFood}
            />
        </div>
    );
};

export default List;
