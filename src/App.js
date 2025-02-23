import {useEffect, useState, useRef} from 'react';
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import ProductList from './components/Products/ProductList';
import Cart from './components/Cart/Cart';
import { CartContext } from './store/cart-context';
import { UserAuthContext } from './store/user-auth-context';
import UserAuth from './components/UserAuth/UserAuth';
import { ThemeProvider } from './store/theme-context';
import axios from 'axios';
import { ProductListContext } from './store/product-list-context';

function App() {
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [productList, setProductList] = useState([]);
  const timeoutRef = useRef(null);

  useEffect(()=>{
    const fetchProductList = async() => {
      try{
        const productListUrl = process.env.REACT_APP_PRODUCT_LIST_URL;
        const response = await axios.get(productListUrl);
        const productList = response?.data?.data || [];
        setProductList(productList);
        console.log('productList---', productList)
      }catch(err){
        console.log("Error while fetching product list: ",err);
      }
    }
    fetchProductList();
  },[]);

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
    dropdownOpen,
    setUsername: setUserName,
    setUserpassword: setUserPassword,
    setIsAuthenticated,
    isAdmin,
    setIsAdmin,
    setDropdownOpen,
  }

  //when user logs in , start the timer
  const resetTimer = () => {
    if(timeoutRef.current){
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
        setDropdownOpen(false);
        setIsAuthenticated(false);
        setIsAdmin(false);
        setCart([]);
    },15000);
  }

  useEffect(()=>{
    if(isAuthenticated){
      resetTimer();

      const events = ["mousemove", "keydown", "scroll", "click"];
      events.forEach(event => window.addEventListener(event, resetTimer));
    }

    return () => {
      clearTimeout(timeoutRef.current);
      const events = ["mousemove", "keydown", "scroll", "click"];
      events.forEach(event => window.removeEventListener(event, resetTimer));
    }
  },[isAuthenticated]);

  const prodList = {
    productList,
    setProductList,
  }

  return (
    <ProductListContext.Provider value={prodList}>
    <ThemeProvider>
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
    </ThemeProvider>
    </ProductListContext.Provider>
  );
}

export default App;
