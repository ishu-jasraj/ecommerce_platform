import React from 'react';

const OrderDetails = ({cart}) => {
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    return(
        <div>
            <p>Total MRP : Rs {totalPrice}</p>
            <p>Platform Fee : Rs 20</p>
            <p>Shipping Fee: FREE</p>
            <p> Total Amount: Rs {totalPrice + 20}</p>
            <button>Proceed To Pay</button>
        </div>
    )
}

export default OrderDetails;