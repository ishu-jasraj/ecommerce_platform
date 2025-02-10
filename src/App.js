import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import NavBar from './NavBar';
import ProductList from './ProductList';
import Cart from './Cart';

function App() {
  return (
    <Router>
        <NavBar/>
        <Routes>
            <Route path='/' element={<ProductList/>}></Route>
            <Route path='/cart' element={<Cart/>}></Route>
        </Routes>
    </Router>
  );
}

export default App;
