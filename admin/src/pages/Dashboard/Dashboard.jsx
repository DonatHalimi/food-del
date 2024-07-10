import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { FaUsers, FaDollarSign } from 'react-icons/fa';
import { BiPackage } from 'react-icons/bi';
import CountUp from 'react-countup';
import './Dashboard.css';
import pizza_loading from '../../assets/pizza-loading.gif'

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = ({ url }) => {
    const [userCount, setUserCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [productCategoryData, setProductCategoryData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userCountResponse = await axios.get(`${url}/api/dashboard/users/count`);
                setUserCount(userCountResponse.data.count);

                const orderCountResponse = await axios.get(`${url}/api/dashboard/orders/count`);
                setOrderCount(orderCountResponse.data.count);

                const totalRevenueResponse = await axios.get(`${url}/api/dashboard/revenue`);
                setTotalRevenue(totalRevenueResponse.data.total);

                const productCategoryResponse = await axios.get(`${url}/api/dashboard/product-categories`);
                setProductCategoryData({
                    labels: productCategoryResponse.data.labels,
                    datasets: [
                        {
                            data: productCategoryResponse.data.data,
                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                        },
                    ],
                });

                setTimeout(() => setLoading(false), 2000);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                console.log(error.response ? error.response.data : error.message);
            }
        };

        fetchData();
    }, [url]);

    return (
        <div className='dashboard'>
            <div className='stats'>
                <div className='stat-item'>
                    <FaUsers size={50} color='#495057' />
                    <h3>Total Users</h3>
                    <p><CountUp end={userCount} duration={2.5} /></p>
                </div>
                <div className='stat-item'>
                    <BiPackage size={50} color='#495057' />
                    <h3>Total Orders</h3>
                    <p><CountUp end={orderCount} duration={2.5} /></p>
                </div>
                <div className='stat-item'>
                    <FaDollarSign size={50} color='#495057' />
                    <h3>Total Revenue</h3>
                    <p>$<CountUp end={totalRevenue} duration={2.5} /></p>
                </div>
            </div>
            <div className='charts'>
                <div className='chart'>
                    <h3>Product Categories</h3>
                    {loading ? <img src={pizza_loading} alt="loading" className='pizza-loading' /> : <Pie data={productCategoryData} />}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;