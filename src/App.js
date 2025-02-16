import {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import ProductList from './components/Products/ProductList';
import Cart from './components/Cart/Cart';
import { CartContext } from './store/cart-context';
import { UserAuthContext } from './store/user-auth-context';
import UserAuth from './components/UserAuth/UserAuth';

function App() {
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

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
    setCart,
    onAdd: addProductToCart,
    onUpdate: updateProductInCart,
  }

  const userAuth = {
    username: userName,
    userpassword: userPassword,
    isAuthenticated,
    setUsername: setUserName,
    setUserpassword: setUserPassword,
    setIsAuthenticated,
  }

  return (
    <UserAuthContext.Provider value={userAuth}>
    <CartContext.Provider value = {cartContextVal}>
    <Router>
        <NavBar isAuthenticated={isAuthenticated} userName={userName} />
        <Routes>
            <Route path='/' element={<ProductList/>}></Route>
            <Route path='/cart' element={<Cart/>}></Route>
            <Route path='/login' element={<UserAuth />}></Route>
        </Routes>
    </Router>
    </CartContext.Provider>
    </UserAuthContext.Provider>
  );
}

export default App;
