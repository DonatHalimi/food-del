import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import OrderList from '../../../components/Order/OrderList';
import OrderPagination from '../../../components/Order/OrderPagination';
import OrderSearch from '../../../components/Order/OrderSearch';
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
                <OrderSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <OrderList orders={currentOrders} url={url} statusHandler={statusHandler} />
            {totalPages > 1 && (
                <OrderPagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} nextPage={nextPage} prevPage={prevPage} />
            )}
            <ToastContainer />
        </div>
    );
};

export default Orders;
