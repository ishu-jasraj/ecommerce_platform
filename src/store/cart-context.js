import { createContext } from 'react';

export const CartContext = createContext({
    cart:[],
    setCart: () => {},
    onAdd: () => {},
    onUpdate: () => {},
});
