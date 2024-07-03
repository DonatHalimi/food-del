import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import DeleteConfirmModal from '../../../components/DeleteConfirmModal/DeleteConfirmModal';
import FoodList from '../../../components/Food/FoodList';
import Pagination from '../../../components/Pagination/Pagination';
import EditFoodModal from '../../../components/Food/EditFoodModal';
import DownloadButtons from '../../../components/DownloadButtons/DownloadButtons';
import CategoryFilter from '../../../components/Food/CategoryFilter';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { StoreContext } from '../../../../../frontend/src/context/StoreContext';

const List = ({ url }) => {
    const { categories, selectedCategory, setSelectedCategory } = useContext(StoreContext);
    const [list, setList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [foodIdToDelete, setFoodIdToDelete] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [foodToEdit, setFoodToEdit] = useState({ id: '', name: '', description: '', price: '', category: '', image: null });
    const [currentImage, setCurrentImage] = useState('');
    const [newImagePreview, setNewImagePreview] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15);

    useEffect(() => {
        fetchList();
    }, [selectedCategory]);

    useEffect(() => {
        if (isEditModalOpen || isModalOpen) {
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
                toast.success(response.data.message, {
                    closeOnClick: true
                });
            } else {
                toast.error(response.data.message, {
                    closeOnClick: true
                });
            }
        } catch (error) {
            toast.error("Error removing product for food ID: " + foodIdToDelete, {
                onClick: () => copyToClipboard(foodIdToDelete),
                style: {
                    cursor: "pointer"
                }
            });
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

    const openEditModal = (food) => {
        setFoodToEdit({
            id: food._id,
            name: food.name,
            description: food.description,
            price: food.price,
            category: food.category._id,
            image: null
        });
        setCurrentImage(`${url}/images/${food.image}`);
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
            setFoodToEdit(prevState => ({
                ...prevState,
                [name]: file
            }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setFoodToEdit(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const editFood = async () => {
        const formData = new FormData();
        formData.append('_id', foodToEdit.id);
        formData.append('name', foodToEdit.name);
        formData.append('description', foodToEdit.description);
        formData.append('price', foodToEdit.price);
        formData.append('category', foodToEdit.category);
        if (foodToEdit.image) {
            formData.append('image', foodToEdit.image);
        }

        try {
            const response = await axios.post(`${url}/api/food/edit`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            await fetchList();
            setIsEditModalOpen(false);

            if (response.data.success) {
                toast.success(response.data.message, {
                    closeOnClick: true
                });
            } else {
                toast.error("Error while updating food", {
                    closeOnClick: true
                });
            }
        } catch (error) {
            toast.error("Error updating product for food: " + foodToEdit._id, {
                onClick: () => copyToClipboard(foodToEdit._id),
                style: {
                    cursor: "pointer"
                }
            });
            console.error('Error while updating food:', error);
        }
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
                    canvas.width = 30;
                    canvas.height = 30;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, 30, 30);
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
                    doc.addImage(data.cell.raw.image, 'PNG', data.cell.x + 2, data.cell.y + 2, 30, 30);
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

    return (
        <div className='list add'>
            <div className='list-title'>
                <p>All Foods List</p>
                <DownloadButtons downloadPDF={downloadPDF} printList={printList} />
            </div>
            <CategoryFilter categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} url={url} />
            <FoodList foods={currentItems} openEditModal={openEditModal} openModal={openModal} url={url} />
            {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} nextPage={nextPage} prevPage={prevPage} />
            )}
            <DeleteConfirmModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={removeFood}
            />
            <EditFoodModal
                isEditModalOpen={isEditModalOpen}
                closeEditModal={closeEditModal}
                foodToEdit={foodToEdit}
                onEditInputChange={onEditInputChange}
                editFood={editFood}
                currentImage={currentImage}
                newImagePreview={newImagePreview}
                categories={categories}
            />
            <ToastContainer />
        </div>
    );
};

export default List;