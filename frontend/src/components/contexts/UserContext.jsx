import React, {createContext, useContext, useEffect, useState} from 'react'

export const UserContext = createContext()

const UserContextProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true)
    const localAuth = localStorage.getItem('isAuthenticated')
    
    useEffect(() => {
        const checkAuth = () => {
            if (!localAuth) {
                setIsAuthenticated(false)
            }
        };
        checkAuth()
    }, [localAuth])

    return (
        <UserContext.Provider value={{setIsAuthenticated, isAuthenticated}}>
            {props.children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext)

export default UserContextProvider