import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';
import { CartContext } from '../../store/cart-context';
import { UserAuthContext } from '../../store/user-auth-context';

const NavBar = () => {
    const { isAuthenticated, setIsAuthenticated, username } = useContext(UserAuthContext);
    const { cart, setCart } = useContext(CartContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const total = cart.reduce((total, item) => total + item.quantity, 0);

    const navigate = useNavigate();

    const onLogout = () => {
        setDropdownOpen(false);
        setIsAuthenticated(false);
        setCart([]);
        setTimeout(() => {navigate('/login')},500);
    }

    return (
        <nav>
            {/* Center: Products & Cart with 10px gap */}
            <div className="nav-center">
                <button onClick={() => navigate('/')}>Products</button>
                <button onClick={() => navigate('/cart')}>Cart ({total})</button>
            </div>

            {/* Right side: Login/Signup OR Username */}
            <div className="nav-right">
                {isAuthenticated ? (
                    <div className="dropdown nav-username">
                    <span>Hey, {username} 👋</span>
                    <span 
                    className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`}
                    onClick={()=>setDropdownOpen(!dropdownOpen)}
                    > ▼ </span>
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            <button>profile</button>
                            <button>set theme</button>
                            <button onClick={onLogout}>logout</button>
                        </div>
                    )}
                    </div>
                ) : (
                    <>
                        <button onClick={() => navigate('/login')}>Login</button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
