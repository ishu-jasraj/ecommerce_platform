import React, { useState } from "react";
import Modal from "react-modal";
import "./Cart.css";
import OrderDetails from "./OrderDetails";
import SuggestedProductList from "./SuggestedProductList";

Modal.setAppElement("#root");

const Cart = ({ products, cart, updateCart, addProductToCart }) => {
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            {/* Cart Container */}
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

                {/* Total Price */}
                {cart.length > 0 && (
                    <p className="total-price-container">
                        <span className="total-price">Total Price: ₹{totalPrice}</span>
                    </p>
                )}

                {/* Place Order Button */}
                {cart.length > 0 && (
                    <button 
                        className="checkout-btn"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Place Order
                    </button>
                )}

                {/* Order Details Modal */}
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    className="modal"
                    overlayClassName="overlay"
                >
                    <OrderDetails totalPrice={totalPrice} />
                    <button className="close-btn" onClick={() => setIsModalOpen(false)}>Close</button>
                </Modal>
            </div>

            {/* Suggested Products - Outside Cart Block */}
            <SuggestedProductList 
                cart={cart} 
                products={products}
                addProductToCart={addProductToCart}
             />
        </>
    );
};

export default Cart;
