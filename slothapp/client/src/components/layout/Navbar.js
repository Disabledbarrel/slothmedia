import React from 'react';
import { Link } from 'react-router-dom';
//import { AuthContext } from '../../contexts/AuthContext';
import Logo from '../../img/logo_framed.png';

const Navbar = () => {
    // Konsumera context
    //const { dispatch } = useContext(AuthContext);

    return (
        <header className="main-header bg-dark">
            <div className="header-inner bg-dark">
                <div className="header-div">
                    <Link to="/" title="Go to landing page"><img src={Logo} alt="Slothmedia logotype" /></Link>
                    <Link to="/" title="Go to landing page"><h1>Slothmedia</h1></Link>
                </div>
                <nav className="navbar">
                    <ul>
                        <li className="btn btn-dark"><Link to="/login" title="Go to the log in page">Log in</Link></li>
                        <li className="btn btn-red"><Link to="/register" title="Go to the register page">Register</Link></li>
                    </ul>
                </nav>
            </div>
        </header>   
    )
}

export default Navbar;
