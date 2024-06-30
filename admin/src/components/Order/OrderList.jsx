import React from 'react';
import { assets } from '../../assets/assets';
import { FaClipboard } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Order.css';

const OrderList = ({ orders, url, statusHandler }) => {
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.info("Order ID copied to clipboard", {
                closeOnClick: true
            });
        }, (err) => {
            toast.error("Failed to copy order ID");
            console.error("Failed to copy text: ", err);
        });
    };

    return (
        <div className="order-list">
            {orders.length > 0 ? (
                orders.map((order, index) => (
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
                        <div className="order-id-copy">
                            <button onClick={() => copyToClipboard(order._id)} className="copy-button">
                                <FaClipboard />
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No orders found</p>
            )}
            <ToastContainer />
        </div>
    );
};

export default OrderList;