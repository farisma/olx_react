import { createContext, useState } from "react";

export const firebaseContext = createContext(null);

export const userContext = createContext(null);

export const Context = ({children}) => {
    const [user, setUser] = useState('Hello');
    return <userContext.Provider value={{user,setUser}}>
            {children}
    </userContext.Provider>
}