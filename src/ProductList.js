import React from "react";
import "./ProductList.css";

const ProductList = ({ products, addProductToCart }) => {
    return (
        <div className="container">
            <h2>Product List</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <div className="product-item">
                            <img src={product.img} alt={product.name} className="product-img" />
                            <span className="product-info">
                                {product.name} 
                                <br />
                                <span className="original-price">₹{product.originalPrice}</span>
                                <span className="discount-price">₹{product.price}</span>
                            </span>
                        </div>
                        <div className="button-group">
                            <button className="add-to-cart" onClick={() => addProductToCart(product)}>
                                Add To Cart
                            </button>
                            <button className="buy-now">Buy Now</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
