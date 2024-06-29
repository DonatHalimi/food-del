import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ConfirmModal from '../../../components/DeleteConfirmModal/DeleteConfirmModal';
import CategoryList from '../../../components/Category/CategoryList';
import Pagination from '../../../components/Pagination/Pagination';
import EditCategoryModal from '../../../components/Category/EditCategoryModal';
import DownloadButtons from '../../../components/DownloadButtons/DownloadButtons';
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

    const editModalRef = useRef(null);
    const deleteModalRef = useRef(null);

    useEffect(() => {
        fetchCategories();
    }, []);

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
                <DownloadButtons downloadPDF={downloadPDF} printList={printList} />
            </div>
            <CategoryList categories={currentItems} openEditModal={openEditModal} openModal={openModal} url={url} />
            <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} nextPage={nextPage} prevPage={prevPage} />
            <ConfirmModal
                ref={deleteModalRef}
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={removeCategory}
            />
            <EditCategoryModal
                ref={editModalRef}
                isEditModalOpen={isEditModalOpen}
                closeEditModal={closeEditModal}
                categoryToEdit={categoryToEdit}
                onEditInputChange={onEditInputChange}
                editCategory={editCategory}
                currentImage={currentImage}
                newImagePreview={newImagePreview}
            />
        </div>
    );
};

export default Categories;
