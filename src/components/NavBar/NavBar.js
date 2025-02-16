import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';
import { CartContext } from '../../store/cart-context';
import { UserAuthContext } from '../../store/user-auth-context';

const NavBar = () => {
    const { isAuthenticated, username } = useContext(UserAuthContext);
    const { cart } = useContext(CartContext);
    const total = cart.reduce((total, item) => total + item.quantity, 0);

    const navigate = useNavigate();
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
                    <span className="nav-username">Hey, {username} 👋</span>
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
