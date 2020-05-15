import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { logout } from '../../actions/auth';
import Logo from '../../img/logo_framed.png';

const Navbar = () => {
    // Konsumera context
    const { authData, dispatch } = useContext(AuthContext);
    const isAuthenticated = authData.isAuthenticated;
    const loading = authData.loading;

    // Länkar
    const guestLinks = (
        <ul>
            <li className="btn btn-dark"><Link to="/login" title="Go to the log in page">Log in</Link></li>
            <li className="btn btn-red"><Link to="/register" title="Go to the register page">Register</Link></li>
        </ul>
    );
    const authLinks = (
        <ul>
            <li className=""><Link to="/dashboard" title="Go to the profile page"><i className="fas fa-user-circle"></i> Profile</Link></li>
            <li><a onClick={e => logout(dispatch)} href="#!" title="Log out from application"><i className="fas fa-sign-out-alt"></i> <span className='hide-sm'>Log out</span></a></li>
        </ul>
    );

    return (
        <header className="main-header bg-dark">
            <div className="header-inner bg-dark">
                <div className="header-div">
                    <Link to="/" title="Go to landing page"><img src={Logo} alt="Slothmedia logotype" /></Link>
                    <Link to="/" title="Go to landing page"><h1>Slothmedia</h1></Link>
                </div>
                <nav className="navbar">
                    { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>) }
                </nav>
            </div>
        </header>  
        
    )
}

export default Navbar;
