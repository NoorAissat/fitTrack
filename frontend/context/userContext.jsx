import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({})

export function UserContextProvider({children}){

    const [user,setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('./profile');
                setUser(response.data);
            } catch (error) {
                console.error("Failed to fetch user profile", error);
                setUser(null);
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}