import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();
export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    // update the dom when theme changes
    useEffect(()=>{
        localStorage.setItem("theme", theme);
        document.body.setAttribute("data-theme", theme);
    },[theme]);

    return (
        <ThemeContext.Provider
            value={{theme, setTheme}}
        >
            {children}
        </ThemeContext.Provider>
    )
}