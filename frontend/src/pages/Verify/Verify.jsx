import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const Verify = () => {
    const [searchParams] = useSearchParams()
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const { url } = useContext(StoreContext)
    const navigate = useNavigate()

    const verifyPayment = async () => {
        if (!success || !orderId) {
            console.error("Missing success or orderId parameter.")
            navigate('/');
            return;
        }

        try {
            const response = await axios.post(`${url}/api/order/verify`, { success, orderId })
            if (response.data.success) {
                navigate('/my-orders')
            } else {
                navigate('/')
            }
        } catch (error) {
            console.error("Failed to verify payment:", error)
            navigate('/')
        }
    };

    useEffect(() => {
        verifyPayment();
    }, []);

    return (
        <div className='verify'>
            <div className="spinner"></div>
        </div>
    );
};

export default Verify;