import React, {useContext, useMemo, useState} from "react";
import "./ProductList.css";
import { DUMMY_PRODUCTS } from "../../assets/dummy_products";
import { CartContext } from "../../store/cart-context";
import { UserAuthContext } from "../../store/user-auth-context";
import Modal from 'react-modal';

const ProductList = () => {
    const [dummyProducts, setDummyProducts] = useState(DUMMY_PRODUCTS);
    const [query, setQuery] = useState("");
    const [addProduct, setAddProduct] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name:"",
        originalPrice: "",
        discountedPrice:"",
    });

    const fields = [
        { name: "name", label:"Product Name", type: "text", placeholder: "Enter product name..." },
        { name: "originalPrice", label:"Original Price", type: "number", placeholder: "Enter original price..." },
        { name: "discountedPrice", label:"Discounted Price", type: "number", placeholder: "Enter discounted price..." }
    ];

    const { onAdd } = useContext(CartContext);
    const {isAdmin} = useContext(UserAuthContext);

    const handleInputChange = (searchQuery) => {
        let val = searchQuery.trim();
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

    const handleProductDataChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prevState)=>({
            ...prevState,
            [name]:value
        }))

    }

    const handleFormButton = () => {
        setAddProduct(false);
        setNewProduct({
                        name:"",
                        originalPrice: "",
                        discountedPrice:"",
                      });
    }

    const handleAddProduct = (e) => {
        e.preventDefault();
        const {name, originalPrice, discountedPrice} = newProduct;
        const productExists = DUMMY_PRODUCTS.find((product) => product.name.trim().toLowerCase() === name.trim().toLowerCase()); 
        if(!productExists){
                const product = { id: DUMMY_PRODUCTS.length+1, 
                                name, 
                                originalPrice, 
                                price: discountedPrice, 
                                img: "https://via.placeholder.com/60" 
                                };
                DUMMY_PRODUCTS.push(product);
                setDummyProducts(()=>[...DUMMY_PRODUCTS]);
                setTimeout(()=>handleFormButton(),500);
                handleInputChange(query);
        }else{
                alert('Product with this name already exists. Please add different product.')
        }
    }
    return (
        <>
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Search Product..."
                    onChange={(e) => handleInputChange(e.target.value)}
                />
                {isAdmin && <button 
                style={{marginLeft:"10px"}} 
                onClick={()=>{setAddProduct(true)}}
                >Add Product </button>}
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
            <Modal
                isOpen={addProduct}
                onRequestClose={() => setAddProduct(false)}
                className="ReactModal__Content" 
                overlayClassName="ReactModal__Overlay" 
            >
                <form onSubmit={handleAddProduct}>
                    <h2>Add Product Details</h2>
                    {fields.map((field) => (
                        <div key={field.name}>
                            <label>{field.label}: </label>
                            <input 
                                type={field.type} 
                                name={field.name}
                                value={newProduct[field.name]} 
                                onChange={handleProductDataChange}
                                placeholder={field.placeholder}
                                required
                            />
                        </div>
                    ))}
                    <button>Add Product</button>
                    <button className="close-btn" onClick={()=>handleFormButton()}>Close</button>
                </form>
            </Modal>
        </>
    );
};

export default ProductList;
