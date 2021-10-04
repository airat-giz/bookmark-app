import { FiLogOut } from 'react-icons/fi'
import React, { useEffect, useState } from 'react'
import {handleLogout} from './APIActions'


const UserArea = () => {
    const [user, setUser] = useState([])
    
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')))
        return () => {
            setUser([])
        }
    }, [])

    return (
        <div className="user-area">
            <p className="user-information">{user.first_name} {user.last_name}</p>
            <FiLogOut className="logout-icon" onClick={handleLogout} /> 
        </div>
    )
}

export default UserArea
