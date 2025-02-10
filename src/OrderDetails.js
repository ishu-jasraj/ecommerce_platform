import React from 'react';
import './OrderDetails.css';

const OrderDetails = ({ totalPrice, onClose }) => {
    const shippingFee = totalPrice > 5000 ? 50 : 0;
    const finalPrice = totalPrice + shippingFee + 20;

    return (
        <div className="order-details">
            <div className="order-summary">
                <h3>Order Summary</h3>
                <div className="order-info">
                    <p><span>Total MRP:</span> <strong>₹{totalPrice}</strong></p>
                    <p><span>Platform Fee:</span> ₹20</p>
                    <p>
                        <span>Shipping Fee:</span> 
                        <strong className={shippingFee > 0 ? "shipping-fee" : "free-shipping"}>
                            {shippingFee > 0 ? `₹${shippingFee}` : 'FREE'}
                        </strong>
                    </p>
                    <hr />
                    <p className="final-price">
                        <span>Total Amount:</span> <strong>₹{finalPrice}</strong>
                    </p>
                </div>
                {shippingFee > 0 && <p className="note">*Rs 50 shipping fee applies for orders above Rs 5000</p>}
            </div>

            {/* Buttons inside modal for better alignment */}
            <div className="button-group">
                <button className="pay-btn">Proceed To Pay</button>
            </div>
        </div>
    );
};

export default OrderDetails;
