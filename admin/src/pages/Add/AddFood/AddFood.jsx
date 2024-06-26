import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddFood.css';
import { assets } from '../../../assets/assets';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const AddFood = ({ url }) => {
    const [image, setImage] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [data, setData] = useState({ name: "", description: "", price: "", category: "" });
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${url}/api/category/list`);
                if (response.data.success) {
                    setCategories(response.data.data);
                    if (response.data.data.length > 0) {
                        setData(prev => ({
                            ...prev,
                            category: response.data.data[0]._id
                        }));
                    }
                } else {
                    toast.error(response.data.message);
                    console.error('Failed to fetch categories:', response.data.message);
                }
            } catch (error) {
                toast.error('Error while fetching categories');
                console.error('Error while fetching categories:', error);
            }
        };

        fetchCategories();
    }, [url]);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prev => ({ ...prev, [name]: value }));
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
        formData.append("price", data.price.toString());
        formData.append("category", data.category);
        formData.append("image", image);

        try {
            const response = await axios.post(`${url}/api/food/add`, formData);
            if (response.data.success) {
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: categories.length > 0 ? categories[0]._id : ""
                });
                setImage(null);
                toast.success(response.data.message, {
                    style: { cursor: 'pointer' },
                    onClick: () => navigate('/list')
                });
            } else {
                toast.error(response.data.message);
                console.error('Failed to add the product', response.data.message);
            }
        } catch (error) {
            toast.error('Error while adding product');
            console.error('Error while adding product:', error);
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
                    className={`add-img-upload flex-col ${isDragging ? 'dragging' : ''}`}
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
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Enter name' required />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Enter description' required></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select onChange={onChangeHandler} name="category" value={data.category}>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='$20' required />
                    </div>
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddFood;
