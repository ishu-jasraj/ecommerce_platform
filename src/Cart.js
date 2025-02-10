import React from "react";
import "./Cart.css";

const Cart = ({ cart, updateCart }) => {
    return (
        <div className="cart-container">
            <h2>Your Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Cart is empty.</p>
            ) : (
                <ul>
                    {cart.map((item, index) => (
                        <li key={index}>
                            <span>{item.name} - ₹{item.price}</span>
                            <div className="qty-container">
                                <button 
                                    className="qty-btn" 
                                    onClick={() => updateCart(item.id, item.quantity - 1)} 
                                    disabled={item.quantity === 0}
                                >
                                    -
                                </button>
                                <span className="qty-value">{item.quantity}</span>
                                <button 
                                    className="qty-btn" 
                                    onClick={() => updateCart(item.id, item.quantity + 1)} 
                                    disabled={item.quantity === 10}
                                >
                                    +
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {cart.length > 0 && <button className="checkout-btn">Proceed To Payment</button>}
        </div>
    );
};

export default Cart;
