import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AddCountry.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const AddCountry = ({ url }) => {
    const [data, setData] = useState({ name: '' })
    const navigate = useNavigate()

    const onChangeHandler = (event) => {
        const { name, value } = event.target
        setData((data) => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post(`${url}/api/country/add`, { name: data.name })
            if (response.data.success) {
                setData({ name: '' })
                toast.success(response.data.message, {
                    style: { cursor: 'pointer' },
                    onClick: () => navigate('/countries')
                })
            } else {
                toast.error(response.data.message)
                console.error('Failed to add the country', response.data.message)
            }
        } catch (error) {
            toast.error('Error while adding country')
            console.error('Error while adding country:', error)
        }
    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-country-name">
                    <p>Country name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Enter name' required />
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    )
}

export default AddCountry