import './styles/FrontPage.css'
import React, { useState } from 'react'
import { Redirect } from "react-router-dom";
import LoginForm from './forms/LoginForm'
import RegistrationForm from './forms/RegistrationForm'
import { useUserContext } from './contexts/UserContext'

const FrontPage = () => {
    const [view, setView] = useState("login")
    const {isAuthenticated} = useUserContext()
    return (
        <div className="front-page">
            {(isAuthenticated) ? 
                 <Redirect to="/app" /> :
            <>
            <div className="front-page-btns">
                <button className={(view === "login") ? "user-btn-toggled" : "user-btn"} onClick={() => setView("login")}>Log in</button>
                <button className={(view === "signup") ? "user-btn-toggled" : "user-btn"} onClick={() => setView("signup")}>Sign up</button>
            </div>
      
            <div className="front-page-user">
                {(view === "login") ? <LoginForm /> : <RegistrationForm />}
            </div>
            </>
            }
        </div>
    )
}

export default FrontPage
