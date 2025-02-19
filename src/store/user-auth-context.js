import { createContext } from "react";

export const UserAuthContext = createContext({
    username:'',
    userpassword: '',
    isAdmin:false,
    isAuthenticated: false,
    setUsername: () => {},
    setUserpassword: () => {},
    setIsAuthenticated: () => {},
    setIsAdmin: () => {},
})