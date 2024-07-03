import React, { useContext, useEffect, useState, useRef } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
    const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
    const navigate = useNavigate();

    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        zipcode: "",
        country: "",
        phone: "",
    });

    const phoneInputRef = useRef(null);

    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = async () => {
        try {
            const response = await axios.get(`${url}/api/country/list`);
            if (response.data.success) {
                setCountries(response.data.countries);
            } else {
                console.error('Error fetching countries');
            }
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    const formatPhoneNumber = (value) => {
        // Remove non-numeric characters
        const cleaned = value.replace(/\D/g, '');

        // Check the prefix and limit length
        const prefix = cleaned.slice(0, 3);
        if (!['044', '045', '049'].includes(prefix)) return value;

        // Format the number
        let formatted = prefix;
        if (cleaned.length > 3) {
            formatted += '-' + cleaned.slice(3, 6);
        }
        if (cleaned.length > 6) {
            formatted += '-' + cleaned.slice(6, 9);
        }

        return formatted;
    };

    const onChangeHandler = async (event) => {
        const { name, value } = event.target;

        if (name === 'phone') {
            const formattedPhone = formatPhoneNumber(value);
            setData(prevData => ({ ...prevData, [name]: formattedPhone }));
        } else if (name === 'country') {
            setData(prevData => ({ ...prevData, [name]: value, city: '', zipcode: '' }));
            const cities = await getCitiesByCountry(value);
            setCities(cities);
        } else if (name === 'city') {
            const selectedCity = cities.find(city => city._id === value);
            if (selectedCity) {
                setData(prevData => ({
                    ...prevData,
                    [name]: value,
                    zipcode: selectedCity.zipcode,
                }));
                // Focus on phone input when city is selected
                if (phoneInputRef.current) {
                    phoneInputRef.current.focus();
                }
            }
        } else {
            setData(prevData => ({ ...prevData, [name]: value }));
        }
    };

    const getCitiesByCountry = async (countryId) => {
        try {
            const response = await axios.get(`${url}/api/city/by-country/${countryId}`);
            if (response.data.success) {
                return response.data.data;
            } else {
                console.error('Error fetching cities by country');
                return [];
            }
        } catch (error) {
            console.error('Error fetching cities by country:', error);
            return [];
        }
    };

    const placeOrder = async (event) => {
        event.preventDefault();

        let orderItems = [];
        food_list.forEach((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = { ...item, quantity: cartItems[item._id] };
                orderItems.push(itemInfo);
            }
        });

        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2,
        };

        let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });

        if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url);
        } else {
            alert("Something went wrong");
        }
    };

    useEffect(() => {
        if (!token) {
            navigate('/cart');
        } else if (getTotalCartAmount() === 0) {
            navigate('/cart');
        }
    }, [token]);

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className='title'>Delivery Information</p>
                <div className="multi-fields">
                    <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
                    <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
                </div>
                <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
                <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
                <div className="multi-fields">
                    <select required name="country" onChange={onChangeHandler} value={data.country}>
                        <option value="" disabled>Select Country</option>
                        {countries.map((country, index) => (
                            <option key={index} value={country._id}>{country.name}</option>
                        ))}
                    </select>
                    <select required name="city" onChange={onChangeHandler} value={data.city}>
                        <option value="" disabled>Select City</option>
                        {cities.map((city, index) => (
                            <option key={index} value={city._id}>{city.name}</option>
                        ))}
                    </select>
                </div>
                <div className="multi-fields">
                    <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zipcode' />
                    <input required name="phone" onChange={onChangeHandler} value={data.phone} ref={phoneInputRef} type="text" placeholder='Phone' />
                </div>
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Total</h2>
                    <div>
                        <div className='cart-total-details'>
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className='cart-total-details'>
                            <p>Delivery Fee</p>
                            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className='cart-total-details'>
                            <b>Total</b>
                            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                        </div>
                    </div>
                    <button type='submit'>PROCEED TO PAYMENT</button>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;
