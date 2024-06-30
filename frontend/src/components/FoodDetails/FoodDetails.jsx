import React, { useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './FoodDetails.css';
import { StoreContext } from '../../context/StoreContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FoodDetails = () => {
    const { id } = useParams();
    const { food_list, addToCart, url } = useContext(StoreContext)
    const foodItem = food_list.find(item => item._id === id)
    const navigate = useNavigate()

    if (!foodItem) {
        return <div>Food item not found</div>;
    }

    const handleAddToCart = (itemId) => {
        addToCart(itemId);
        toast.success(`${foodItem.name} has been added to your cart`, {
            onClick: (() => {
                navigate('/cart')
            }),
            style: {
                cursor: 'pointer'
            }
        })
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="food-details-container">
            <div className="breadcrumb">
                <Link to="/">Home</Link> &gt; {foodItem.name}
            </div>
            <div className="food-details">
                <img src={url + "/images/" + foodItem.image} alt={foodItem.name} />
                <div className="food-details-content">
                    <h2>{foodItem.name}</h2>
                    <p className="category">Category: {foodItem.category.name}</p>
                    <p>{foodItem.description}</p>
                    <p className="price">${foodItem.price.toFixed(2)}</p>
                    <div className="btn-container">
                        <button className="btn" onClick={() => handleAddToCart(foodItem._id)}>Add to Cart</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default FoodDetails;
