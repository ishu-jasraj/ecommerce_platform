import React, {useContext, useMemo, useState} from "react";
import "./ProductList.css";
import { DUMMY_PRODUCTS } from "../../assets/dummy_products";
import { CartContext } from "../../store/cart-context";

const ProductList = () => {
    const [dummyProducts, setDummyProducts] = useState(DUMMY_PRODUCTS);
    const [query, setQuery] = useState("");
    const { onAdd } = useContext(CartContext);

    const handleInputChange = (searchQuery) => {
        let val = searchQuery.trim();
        console.log(val)
        if(val !== query){
            setQuery(val);
        }
    };

    const filteredProducts = useMemo(() => {
        return dummyProducts.filter((item) => {
            const itemName = item.name.toLowerCase();
            return itemName.includes(query.toLowerCase());
        });
    }, [query, dummyProducts]);

    const onAddProduct = () => {
        const product = { id: DUMMY_PRODUCTS.length+1, 
                          name: `Smart time clock ${DUMMY_PRODUCTS.length}`, 
                          originalPrice: 500, 
                          price: 300, 
                          img: "https://via.placeholder.com/60" 
                        };
        DUMMY_PRODUCTS.push(product);
        setDummyProducts(()=>[...DUMMY_PRODUCTS]);
        handleInputChange(query);
    }
    return (
        <>
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Search Product..."
                    onChange={(e) => handleInputChange(e.target.value)}
                />
                <button 
                style={{marginLeft:"10px"}} 
                onClick={onAddProduct}
                >Add Product </button>
            </div>
            <div className="container">
                <h2>Product List</h2>
                <ul>
                    {filteredProducts.length > 0 && filteredProducts.map((product) => (
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
                {dummyProducts.length === 0 && <p>Product List is empty!!</p>}
            </div>
        </>
    );
};

export default ProductList;
