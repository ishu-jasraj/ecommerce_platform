import {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import NavBar from './NavBar';
import ProductList from './ProductList';
import Cart from './Cart';

const products = [
  { id: 1, name: "Laptop", originalPrice: 80000, price: 75000, img: "https://via.placeholder.com/60" },
  { id: 2, name: "Smartphone", originalPrice: 35000, price: 30000, img: "https://via.placeholder.com/60" },
  { id: 3, name: "Headphones", originalPrice: 7000, price: 5000, img: "https://via.placeholder.com/60" },
  { id: 4, name: "Smart Watch", originalPrice: 20000, price: 15000, img: "https://via.placeholder.com/60" },
];

function App() {
  const [cart, setCart] = useState([]);

  const addProductToCart = (productDetail) => {
       const {id, name, price} = productDetail;
       const isProductPresent = cart.filter((product)=>product.id === id);
       if(isProductPresent.length === 0){
           const product = {
            id,
            name,
            price,
            quantity:1
           }
        setCart((prevCart)=>[...prevCart,product]);
       }
  }
  const updateCart = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: Math.max(0, Math.min(10, quantity)) } : item
      ).filter((item) => item.quantity > 0)
  );
  }
  return (
    <Router>
        <NavBar/>
        <Routes>
            <Route path='/' element={<ProductList addProductToCart={addProductToCart} products={products} />}></Route>
            <Route path='/cart' element={<Cart products={products} cart={cart} updateCart={updateCart} addProductToCart={addProductToCart}/>}></Route>
        </Routes>
    </Router>
  );
}

export default App;
