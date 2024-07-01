import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddCategory.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { assets } from '../../../assets/assets';

const AddCategory = ({ url }) => {
    const [image, setImage] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
    });

    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((data) => ({ ...data, [name]: value }));
    };

    const onDropHandler = (event) => {
        event.preventDefault();
        setIsDragging(false);
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            setImage(event.dataTransfer.files[0]);
        }
    };

    const onDragOverHandler = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const onDragLeaveHandler = () => {
        setIsDragging(false);
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("image", image);

        try {
            const response = await axios.post(`${url}/api/category/add`, formData);
            if (response.data.success) {
                setData({
                    name: "",
                    description: "",
                });
                setImage(null);
                toast.success(response.data.message, {
                    style: { cursor: 'pointer' },
                    onClick: () => navigate('/categories')
                });
            } else {
                toast.error(response.data.message);
                console.error('Failed to add the category', response.data.message);
            }
        } catch (error) {
            toast.error('Error while adding category');
            console.error('Error while adding category:', error);
        }
    };

    useEffect(() => {
        return () => {
            if (image) {
                URL.revokeObjectURL(image);
            }
        };
    }, [image]);

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div
                    className={`add-img-upload ${isDragging ? 'dragging' : ''}`}
                    onDrop={onDropHandler}
                    onDragOver={onDragOverHandler}
                    onDragLeave={onDragLeaveHandler}
                >
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        id='image'
                        hidden
                        required={!image}
                    />
                </div>
                <div className="add-category-name flex-col">
                    <p>Category name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Enter name' required />
                </div>
                <div className="add-category-description flex-col">
                    <p>Category description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Enter description' required></textarea>
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddCategory;
