import React, { useEffect, useState } from 'react';
import './Categories.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import { BsTrash3, BsPencil } from 'react-icons/bs';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const Categories = ({ url }) => {
    const [list, setList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState({ id: '', name: '', description: '', image: null });
    const [currentImage, setCurrentImage] = useState('');
    const [newImagePreview, setNewImagePreview] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (isEditModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isEditModalOpen]);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.info("Category ID copied to clipboard");
        }, (err) => {
            toast.error("Failed to copy category ID");
            console.error("Failed to copy text: ", err);
        });
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${url}/api/category/list`);
            if (response.data.success) {
                setList(response.data.data);
            } else {
                toast.error("Error fetching category list");
            }
        } catch (error) {
            toast.error("Error fetching category list");
            console.error('Error fetching category list:', error);
        }
    };

    const removeCategory = async () => {
        try {
            const response = await axios.post(`${url}/api/category/remove`, { id: categoryIdToDelete });
            await fetchCategories();
            setIsModalOpen(false);

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
            toast.error("Error removing category for category ID: " + categoryIdToDelete, {
                onClick: () => copyToClipboard(categoryIdToDelete),
                style: {
                    cursor: "pointer"
                }
            });
            console.error('Error while deleting product:', error);
        }
    };

    const openModal = (categoryId) => {
        setCategoryIdToDelete(categoryId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openEditModal = (category) => {
        setCategoryToEdit({
            id: category._id,
            name: category.name,
            description: category.description,
            image: null
        });
        setCurrentImage(`${url}/images/${category.image}`);
        setNewImagePreview('');
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const onEditInputChange = (event) => {
        const { name, value, files } = event.target;
        if (files && files[0]) {
            const file = files[0];
            setCategoryToEdit(prevState => ({
                ...prevState,
                [name]: file
            }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setCategoryToEdit(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const editCategory = async () => {
        const formData = new FormData();
        formData.append('_id', categoryToEdit.id);
        formData.append('name', categoryToEdit.name);
        formData.append('description', categoryToEdit.description);
        if (categoryToEdit.image) {
            formData.append('image', categoryToEdit.image);
        }

        console.log("category to edit " + categoryToEdit)
        try {
            const response = await axios.post(`${url}/api/category/edit`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            await fetchCategories();
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
            toast.error("Error updating category for category: " + categoryToEdit, {
                onClick: () => copyToClipboard(categoryToEdit),
                style: {
                    cursor: "pointer"
                }
            }); console.error('Error while updating category:', error);
        }
    };

    const downloadPDF = async () => {
        const doc = new jsPDF('p', 'pt', 'a4');
        const tableColumn = ["Item", "Name", "Description"];
        const tableRows = [];

        const promises = list.map(async item => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = `${url}/images/` + item.image;

            return new Promise((resolve, reject) => {
                img.onload = async () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = 30;
                    canvas.height = 30;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, 30, 30);
                    const imgData = canvas.toDataURL('image/png');

                    const itemData = [
                        { content: '', image: imgData },
                        item.name,
                        item.description
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
                    doc.addImage(data.cell.raw.image, 'PNG', data.cell.x + 2, data.cell.y + 2, 30, 30);
                }
            }
        });

        doc.text("Category List", 14, 15);
        doc.save("category_list.pdf");
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

    return (
        <div className='category add'>
            <div className='category-title'>
                <p>All Categories List</p>
                <div className="download-buttons">
                    <button onClick={downloadPDF}>Export PDF</button>
                    <button onClick={printList}>Print</button>
                </div>
            </div>
            <div className="category-table">
                <div className="category-table-format title">
                    <b>Item</b>
                    <b>Name</b>
                    <b>Description</b>
                    <b>Action</b>
                </div>
                {currentItems.map((item, index) => (
                    <div key={index} className='category-table-format'>
                        <img src={`${url}/images/` + item.image} alt="" />
                        <p>{item.name}</p>
                        <p>{item.description}</p>
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
                onConfirm={removeCategory}
            />
            {isEditModalOpen && (
                <div className="edit-modal">
                    <div className="edit-modal-content">
                        <h2>Edit Category</h2>
                        <input
                            type="text"
                            name="name"
                            value={categoryToEdit.name}
                            onChange={onEditInputChange}
                            placeholder="Category name"
                        />
                        <textarea
                            name="description"
                            value={categoryToEdit.description}
                            onChange={onEditInputChange}
                            placeholder="Description"
                            id='category-edit-desc'
                        />
                        <div className="edit-food-image">
                            <p>Current Image</p>
                            <img src={currentImage} alt="Current category" />
                        </div>
                        <div className="edit-food-image">
                            <p>New Image</p>
                            <label className="custom-file-upload">
                                <input
                                    type="file"
                                    name="image"
                                    onChange={onEditInputChange}
                                    accept="image/*"
                                />
                                Choose File
                            </label>
                            {newImagePreview && (
                                <>
                                    <p>Preview</p>
                                    <img src={newImagePreview} alt="New preview" />
                                </>
                            )}
                        </div>
                        <div className="edit-modal-buttons">
                            <button onClick={closeEditModal} className="edit-modal-button" id='cancel-category'>Cancel</button>
                            <button onClick={editCategory} className="edit-modal-button" id='save-category'>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Categories;
