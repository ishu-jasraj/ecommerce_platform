import { createContext } from "react";

export const UserAuthContext = createContext({
    username:'',
    userpassword: '',
    isAdmin:false,
    isAuthenticated: false,
    dropdownOpen: false,
    setDropdownOpen: () => {},
    setUsername: () => {},
    setUserpassword: () => {},
    setIsAuthenticated: () => {},
    setIsAdmin: () => {},
})