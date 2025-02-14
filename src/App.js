import {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import ProductList from './components/Products/ProductList';
import Cart from './components/Cart/Cart';
import { CartContext } from './store/cart-context';

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
  const updateProductInCart = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: Math.max(0, Math.min(10, quantity)) } : item
      ).filter((item) => item.quantity > 0)
  );
  }
  const cartContextVal = {
    cart,
    onAdd: addProductToCart,
    onUpdate: updateProductInCart,
  }

  return (
    <CartContext.Provider value = {cartContextVal}>
    <Router>
        <NavBar/>
        <Routes>
            <Route path='/' element={<ProductList/>}></Route>
            <Route path='/cart' element={<Cart/>}></Route>
        </Routes>
    </Router>
    </CartContext.Provider>
  );
}

export default App;
