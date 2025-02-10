import React, {useState} from "react";
import Modal from 'react-modal';
import "./Cart.css";
import OrderDetails from "./OrderDetails";

Modal.setAppElement("#root");

const Cart = ({ cart, updateCart }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
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
            {cart.length > 0 && <button 
                                 className="checkout-btn"
                                 onClick = {()=>setIsModalOpen(true)}
                                >Place Order</button>}
            <Modal
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
              className="modal"
              overlayClassName="overlay"
            >
              <OrderDetails cart={cart} />
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>Close</button>
            </Modal>
        </div>
    );
};

export default Cart;
