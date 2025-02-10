import React from 'react';
import './ProductList.css';

const products = [
    {id: 1, name: 'Laptop', price: 100},
    {id: 2, name: 'Ring', price: 200},
    {id: 3, name: 'Mobile Phone', price: 300},
    {id: 4, name: 'Notebook', price: 400},
    {id: 5, name: 'Charger', price: 500},
];

const ProductList = ({ addProductToCart }) => {
    return (
        <div>
            <h2>Product List</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <span className="product-item">
                            <span>{product.name} - ₹{product.price}</span>
                            <span>
                                <button 
                                className="add-to-cart"
                                onClick={()=>addProductToCart(product)}
                                >Add To Cart
                                </button>
                            </span>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ProductList;

