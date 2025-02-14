import React, {useContext} from "react";
import "./ProductList.css";
import { DUMMY_PRODUCTS } from "../../assets/dummy_products";
import { CartContext } from "../../store/cart-context";

const ProductList = () => {
    const { onAdd } = useContext(CartContext);
    return (
        <div className="container">
            <h2>Product List</h2>
            <ul>
                {DUMMY_PRODUCTS.map((product) => (
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
                            <button className="add-to-cart" onClick={() => onAdd(product)}>
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
