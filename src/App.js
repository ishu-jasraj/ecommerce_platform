import {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import NavBar from './NavBar';
import ProductList from './ProductList';
import Cart from './Cart';

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
            <Route path='/' element={<ProductList addProductToCart={addProductToCart}/>}></Route>
            <Route path='/cart' element={<Cart cart={cart} updateCart={updateCart}/>}></Route>
        </Routes>
    </Router>
  );
}

export default App;
