import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    const navigate = useNavigate();
    return(
        <nav>
            <button onClick={()=>navigate('/')}>Products</button>
            <button onClick={()=>navigate('/cart')}>Cart</button>
        </nav>
    )
}

export default NavBar;