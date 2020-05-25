import React, { useContext, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { logout } from '../../actions/auth';
import Logo from '../../img/logo_framed.png';
import SideBar from './SideBar';
import onClickOutside from "react-onclickoutside";

function Navbar() {
    // Konsumera context
    const { authData, dispatch } = useContext(AuthContext);
    const isAuthenticated = authData.isAuthenticated;
    const loading = authData.loading;

    // Länkar
    const guestLinks = (
        <ul>
            <li className="btn btn-dark btn-header"><Link to="/login" title="Go to the log in page">Sign in</Link></li>
            <li className="btn btn-red btn-header"><Link to="/register" title="Go to the register page">Register</Link></li>
        </ul>
    );
    const authLinks = (
        <Fragment>
            <ul className="auth-links">
                <li><Link to="/dashboard" title="Go to the profile page"><i className="fas fa-user-circle"></i> Profile</Link></li>
                <li><a onClick={e => logout(dispatch)} href="#!" title="Log out from application"><i className="fas fa-sign-out-alt"></i> <span className='hide-sm'>Log out</span></a></li>
            </ul>
        </Fragment>
    );

    // Toggla liten meny
    const [showMenu, setShowMenu] = useState({
        sideBarOpen: false
    });
    const { sideBarOpen } = showMenu; 
    let toggleSideBar;

    const onClick = () => {
        setShowMenu({...showMenu, sideBarOpen: !sideBarOpen});
    }
    if(sideBarOpen) {
        toggleSideBar = <SideBar />
    }
    Navbar.handleClickOutside = () => setShowMenu({...showMenu, sideBarOpen: false});

    return (
        <header className="main-header bg-dark">
            <div className="header-inner bg-dark">
                <div className="header-div">
                    <Link to="/" title="Go to landing page" className="logo-link"><img src={Logo} alt="Slothmedia logotype" /></Link>
                    <Link to="/" title="Go to landing page" className="header-link"><h1>Slothmedia</h1></Link>
                </div>
                <nav className="navbar">
                    { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>) }
                </nav>
                <div className="toggle-container">
                    <button className="toggle-button" onClick={onClick} title="toggle menu">
                            <i className="fas fa-ellipsis-h"></i>
                    </button>
                    {toggleSideBar}
                </div>
            </div>
        </header>  
        
    )
}

const clickOutsideConfig = {
    handleClickOutside: () => Navbar.handleClickOutside
};

export default onClickOutside(Navbar, clickOutsideConfig);
