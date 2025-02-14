import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';
import { CartContext } from '../../store/cart-context';

const NavBar = () => {
    const { cart } = useContext(CartContext);
    const total =  cart.reduce((total, item)=>{
        return total + item.quantity;
    },0);

    const navigate = useNavigate();
    return(
        <nav>
            <button onClick={()=>navigate('/')}>Products</button>
            <button onClick={()=>navigate('/cart')}>Cart ({total})</button>
        </nav>
    )
}

export default NavBar;