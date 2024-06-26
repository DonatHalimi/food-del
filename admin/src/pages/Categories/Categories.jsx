import React, { useEffect, useState } from 'react';
import './Categories.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import { BsTrash3 } from 'react-icons/bs';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const Categories = ({ url }) => {
    const [list, setList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [foodIdToDelete, setFoodIdToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${url}/api/category/list`);
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
            const response = await axios.post(`${url}/api/category/remove`, { id: foodIdToDelete });
            await fetchCategories();
            setIsModalOpen(false);

            if (response.data.success) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
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

    const downloadPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ["Item", "Name", "Category", "Price"];
        const tableRows = [];

        list.forEach(item => {
            const itemData = [
                item.image,
                item.name,
                item.category,
                item.price
            ];
            tableRows.push(itemData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 20 });
        doc.text("Food List", 14, 15);
        doc.save("food_list.pdf");
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
                <p>All Categories List</p>
                <div className="download-buttons">
                    <button onClick={downloadPDF}>Export PDF</button>
                </div>
            </div>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Item</b>
                    <b>Name</b>
                    <b>Description</b>
                    <b>Action</b>
                </div>
                {currentItems.map((item, index) => (
                    <div key={index} className='list-table-format'>
                        <img src={`${url}/images/` + item.image} alt="" />
                        <p>{item.name}</p>
                        <p>{item.description}</p>
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

export default Categories;