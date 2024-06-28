import React, { useEffect, useState } from 'react';
import './Orders.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import 'react-toastify/dist/ReactToastify.css';

const Orders = ({ url }) => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);

    const fetchAllOrders = async () => {
        try {
            const response = await axios.get(url + "/api/order/list");
            if (response.data.success) {
                setOrders(response.data.data);
            } else {
                toast.error("Error fetching orders");
            }
        } catch (error) {
            toast.error("Error fetching orders");
            console.error("Error fetching orders:", error);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.info("Order ID copied to clipboard");
        }, (err) => {
            toast.error("Failed to copy order ID");
            console.error("Failed to copy text: ", err);
        });
    };

    const statusHandler = async (event, orderId) => {
        const status = event.target.value;
        try {
            const response = await axios.post(url + "/api/order/status", { orderId, status });
            if (response.data.success) {
                await fetchAllOrders();
                toast.success(`Changed order status for order ID: ${orderId}`, {
                    onClick: () => copyToClipboard(orderId),
                    style: {
                        cursor: "pointer"
                    }
                });
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(`Error updating order status for order ID: ${orderId}`, {
                onClick: () => copyToClipboard(orderId),
                style: {
                    cursor: "pointer"
                }
            });
            console.error("Error updating order status:", error);
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    const filterOrders = (orders) => {
        return orders.filter(order => {
            const searchText = searchTerm.toLowerCase();
            return (
                order._id.toLowerCase().includes(searchText) ||
                order.address.firstName.toLowerCase().includes(searchText) ||
                order.address.lastName.toLowerCase().includes(searchText) ||
                order.address.street.toLowerCase().includes(searchText) ||
                order.address.city.name.toLowerCase().includes(searchText) ||
                order.address.country.name.toLowerCase().includes(searchText) ||
                order.address.phone.toLowerCase().includes(searchText)
            );
        });
    };

    const indexOfLastOrder = currentPage * itemsPerPage;
    const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
    const currentOrders = filterOrders(orders).slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filterOrders(orders).length / itemsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className='order add'>
            <div className='order-title-container'>
                <h3>Order Page</h3>
                <div className='order-search'>
                    <input
                        type='text'
                        placeholder='Search orders...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="order-list">
                {currentOrders.length > 0 ? (
                    currentOrders.map((order, index) => (
                        <div key={index} className="order-item">
                            <img src={assets.parcel_icon} alt="" />
                            <div>
                                <p className='order-item-food'>
                                    {order.items.map((item, itemIndex) => (
                                        itemIndex === order.items.length - 1 ?
                                            `${item.name} x ${item.quantity}` :
                                            `${item.name} x ${item.quantity}, `
                                    ))}
                                </p>
                                <p className='order-item-name'>{`${order.address?.firstName} ${order.address?.lastName}`}</p>
                                <div className='order-item-address'>
                                    <p>{order.address.street + ", "}</p>
                                    <div className='order-item-address'>
                                        <p>{`${order.address.city?.name}, ${order.address.country?.name}, ${order.address.zipcode}`}</p>
                                    </div>
                                </div>
                                <p className='order-item-phone'>{order.address.phone}</p>
                            </div>
                            <p>Items: {order.items.length}</p>
                            <p>${order.amount}</p>
                            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                                <option value="Food Processing">Food Processing</option>
                                <option value="Out for Delivery">Out for Delivery</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </div>
                    ))
                ) : (
                    <p>No orders found</p>
                )}
            </div>
            <div className="pagination-orders">
                <button className="pagination-orders-button" onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index} className={`pagination-orders-button ${currentPage === index + 1 ? 'active' : ''}`} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </button>
                ))}
                <button className="pagination-orders-button" onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Orders;
