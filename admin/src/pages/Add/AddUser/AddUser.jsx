import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AddUser.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

const AddUser = ({ url }) => {
    const [data, setData] = useState({ name: '', email: '', password: '' })
    const navigate = useNavigate()

    const onChangeHandler = (event) => {
        const { name, value } = event.target
        setData((data) => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post(`${url}/api/user/add`, { name: data.name, email: data.email, password: data.password })
            if (response.data.success) {
                setData({ name: '', email: '', password: '' })
                toast.success(response.data.message, {
                    style: { cursor: 'pointer' },
                    onClick: () => navigate('/users')
                })
            } else {
                toast.error(response.data.message)
                console.error('Failed to add the user', response.data.message)
            }
        } catch (error) {
            toast.error('Error while adding user')
            console.error('Error while adding user:', error)
        }
    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-user-name flex-col">
                    <p>User name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Enter name' required />
                </div>
                <div className="add-user-name flex-col">
                    <p>Email</p>
                    <input onChange={onChangeHandler} value={data.email} type="text" name='email' placeholder='Enter email' required />
                </div>
                <div className="add-user-name">
                    <p>Password</p>
                    <input onChange={onChangeHandler} value={data.password} type="text" name='password' placeholder='Enter password' required />
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>
            <ToastContainer />
        </div>
    )
}

export default AddUser