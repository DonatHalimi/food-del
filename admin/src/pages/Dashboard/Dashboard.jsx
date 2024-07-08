import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { FaUsers, FaDollarSign, FaShoppingCart } from 'react-icons/fa';
import './Dashboard.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
    const [userCount, setUserCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [userGrowthData, setUserGrowthData] = useState(null);
    const [revenueTrendData, setRevenueTrendData] = useState(null);
    const [productCategoryData, setProductCategoryData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userCountResponse = await axios.get('/api/dashboard/users/count');
                console.log('User Count Response:', userCountResponse);
                setUserCount(userCountResponse.data.count);

                const orderCountResponse = await axios.get('/api/dashboard/orders/count');
                console.log('Order Count Response:', orderCountResponse);
                setOrderCount(orderCountResponse.data.count);

                const totalRevenueResponse = await axios.get('/api/dashboard/revenue');
                console.log('Total Revenue Response:', totalRevenueResponse);
                setTotalRevenue(totalRevenueResponse.data.total);

                const userGrowthResponse = await axios.get('/api/dashboard/users/growth');
                console.log('User Growth Response:', userGrowthResponse);
                setUserGrowthData({
                    labels: userGrowthResponse.data.labels,
                    datasets: [
                        {
                            label: 'Users',
                            data: userGrowthResponse.data.data,
                            backgroundColor: 'rgba(75,192,192,0.4)',
                            borderColor: 'rgba(75,192,192,1)',
                            borderWidth: 1,
                        },
                    ],
                });

                const revenueTrendResponse = await axios.get('/api/dashboard/revenue/trend');
                console.log('Revenue Trend Response:', revenueTrendResponse);
                setRevenueTrendData({
                    labels: revenueTrendResponse.data.labels,
                    datasets: [
                        {
                            label: 'Revenue',
                            data: revenueTrendResponse.data.data,
                            backgroundColor: 'rgba(153,102,255,0.6)',
                            borderColor: 'rgba(153,102,255,1)',
                            borderWidth: 1,
                        },
                    ],
                });

                // Example static data for simplicity
                setProductCategoryData({
                    labels: ['Electronics', 'Furniture', 'Clothing', 'Books'],
                    datasets: [
                        {
                            data: [30, 20, 25, 25],
                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='dashboard'>
            <div className='stats'>
                <div className='stat-item'>
                    <FaUsers size={50} />
                    <h3>Total Users</h3>
                    <p>{userCount}</p>
                </div>
                <div className='stat-item'>
                    <FaShoppingCart size={50} />
                    <h3>Total Orders</h3>
                    <p>{orderCount}</p>
                </div>
                <div className='stat-item'>
                    <FaDollarSign size={50} />
                    <h3>Total Revenue</h3>
                    <p>${totalRevenue}</p>
                </div>
            </div>
            <div className='charts'>
                <div className='chart'>
                    <h3>User Growth</h3>
                    {userGrowthData ? <Line data={userGrowthData} /> : <p>Loading...</p>}
                </div>
                <div className='chart'>
                    <h3>Revenue Trend</h3>
                    {revenueTrendData ? <Bar data={revenueTrendData} /> : <p>Loading...</p>}
                </div>
                <div className='chart'>
                    <h3>Product Categories</h3>
                    {productCategoryData ? <Pie data={productCategoryData} /> : <p>Loading...</p>}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
