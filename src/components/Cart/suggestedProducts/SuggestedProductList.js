import React, {useContext} from 'react';
import "./SuggestedProducts.css";
import { CartContext } from '../../../store/cart-context';
import { ProductListContext } from '../../../store/product-list-context';

const SuggestedProductList = () => {
    const {productList} = useContext(ProductListContext);
    const { cart, onAdd } = useContext(CartContext);
    const suggestedProducts = productList.filter(
        (product) => !cart.some((cartItem) => cartItem.id === product.id)
    );

    return (
        <>
            {suggestedProducts.length > 0 && (
                <div className="suggested-products">
                    <h2>Suggested Products</h2>
                    <div className="product-grid">
                        {suggestedProducts.map((product) => (
                            <div className="product-card" key={product.id}>
                                <h3>{product.name}</h3>
                                <p className="product-price">₹{product.price}</p>
                                <button className="add-to-cart" onClick={() => onAdd(product)}>
                                    Add To Cart
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default SuggestedProductList;
