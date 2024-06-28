import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddCity.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const AddCity = ({ url }) => {
    const [data, setData] = useState({ name: '', country: '', zipcode: '' });
    const [countries, setCountries] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get(`${url}/api/country/list`);
                if (response.data.success) {
                    setCountries(response.data.countries);
                } else {
                    toast.error(response.data.message || 'Failed to fetch countries');
                }
            } catch (error) {
                toast.error('Error fetching countries');
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, [url]);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${url}/api/city/add`, {
                name: data.name,
                country: data.country,
                zipcode: data.zipcode,
            });
            if (response.data.success) {
                setData({ name: '', country: '', zipcode: '' });
                toast.success(response.data.message, {
                    style: { cursor: 'pointer' },
                    onClick: () => navigate('/cities'),
                });
            } else {
                toast.error(response.data.message || 'Failed to add the city');
                console.error('Failed to add the city:', response.data.message);
            }
        } catch (error) {
            toast.error('Error while adding city');
            console.error('Error while adding city:', error);
        }
    };

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-city-name'>
                    <p>City name</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        type='text'
                        name='name'
                        placeholder='Enter name'
                        required
                    />
                </div>
                <div className='add-city flex-col'>
                    <p>Country</p>
                    <select
                        onChange={onChangeHandler}
                        value={data.country}
                        name='country'
                        required
                    >
                        <option value='' disabled>Select Country</option>
                        {countries &&
                            countries.map((country) => (
                                <option key={country._id} value={country._id}>
                                    {country.name}
                                </option>
                            ))}
                    </select>
                </div>
                <div className='add-city-zipcode flex-col'>
                    <p>Zipcode</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.zipcode}
                        type='text'
                        name='zipcode'
                        placeholder='Enter zipcode'
                        required
                    />
                </div>
                <button type='submit' className='add-btn'>
                    ADD
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddCity;