import React, { useContext, useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import { BsTrash3 } from 'react-icons/bs';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { StoreContext } from '../../../../frontend/src/context/StoreContext';

const List = ({ url }) => {
    const { categories, selectedCategory, setSelectedCategory } = useContext(StoreContext);
    const [list, setList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [foodIdToDelete, setFoodIdToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15);

    useEffect(() => {
        fetchList();
    }, [selectedCategory]);

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if (response.data.success) {
                if (selectedCategory === 'All') {
                    setList(response.data.data);
                } else {
                    setList(response.data.data.filter(item => item.category.name === selectedCategory));
                }
            } else {
                toast.error(response.data.message);
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

    const downloadPDF = async () => {
        const doc = new jsPDF('p', 'pt', 'a4');
        const tableColumn = ["Item", "Name", "Category", "Price"];
        const tableRows = [];

        const promises = list.map(async item => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = `${url}/images/` + item.image;

            return new Promise((resolve, reject) => {
                img.onload = async () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = 30; // Fixed width
                    canvas.height = 30; // Fixed height
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, 30, 30); // Draw image with fixed size
                    const imgData = canvas.toDataURL('image/png');

                    const itemData = [
                        { content: '', image: imgData },
                        item.name,
                        item.category.name,
                        item.price
                    ];
                    tableRows.push(itemData);
                    resolve();
                };
                img.onerror = (error) => reject(error);
            });
        });

        await Promise.all(promises);

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            didDrawCell: data => {
                if (data.column.dataKey === 0 && data.cell.section === 'body') {
                    doc.addImage(data.cell.raw.image, 'PNG', data.cell.x + 2, data.cell.y + 2, 30, 30); // Add image with fixed size
                }
            }
        });

        doc.text("Food List", 14, 15);
        doc.save("food_list.pdf");
    };

    const printList = () => {
        window.print();
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

    const handleCategoryClick = (categoryName) => {
        setSelectedCategory(prev => prev === categoryName ? 'All' : categoryName);
    };

    return (
        <div className='list add'>
            <div className='list-title'>
                <p>All Foods List</p>
                <div className="download-buttons">
                    <button onClick={downloadPDF}>Export PDF</button>
                    <button onClick={printList}>Print</button>
                </div>
            </div>
            <div className='category-filter'>
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className={selectedCategory === category.name ? 'active' : ''}
                        onClick={() => handleCategoryClick(category.name)}
                    >
                        <img
                            className={selectedCategory === category.name ? "active" : ""}
                            src={`${url}/images/` + category.image}
                            alt={category.name}
                        />
                        <p>{category.name}</p>
                    </div>
                ))}
                <div
                    className={selectedCategory === 'All' ? 'active' : ''}
                    onClick={() => setSelectedCategory('All')}
                >
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
                        <img src={`${url}/images/` + item.image} alt={item.name} />
                        <p>{item.name}</p>
                        <p>{item.category ? item.category.name : ''}</p>
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