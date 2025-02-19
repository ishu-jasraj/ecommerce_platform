import React, { useContext, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';
import { CartContext } from '../../store/cart-context';
import { UserAuthContext } from '../../store/user-auth-context';
import { ThemeContext } from '../../store/theme-context';

const NavBar = () => {
    const { isAuthenticated, setIsAuthenticated, username } = useContext(UserAuthContext);
    const { cart, setCart } = useContext(CartContext);
    const {theme, setTheme} = useContext(ThemeContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const total = useMemo(()=>cart.reduce((total, item) => total + item.quantity, 0),[cart]);

    const navigate = useNavigate();

    const onLogout = () => {
        setDropdownOpen(false);
        setIsAuthenticated(false);
        setCart([]);
        setTimeout(() => {navigate('/login')},500);
    }

    const handleTheme = () => {
        setTheme((prevTheme) => {
            return prevTheme === 'light' ? 'dark' : 'light';
        })
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
                            <button onClick={handleTheme}>switch to {theme === 'light' ? 'dark' : 'light'} mode</button>
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
