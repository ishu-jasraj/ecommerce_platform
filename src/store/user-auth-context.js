import { createContext } from "react";

export const UserAuthContext = createContext({
    username:'',
    userpassword: '',
    isAuthenticated: false,
    setUsername: () => {},
    setUserpassword: () => {},
    setIsAuthenticated: () => {},
})