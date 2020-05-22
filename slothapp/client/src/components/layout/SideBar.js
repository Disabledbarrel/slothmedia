import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const  SideBar = () => {
    return (
        <Fragment>
            <div className="small-menu">
                <ul>
                    <li><Link to="/about" title="Go to the about page">About</Link></li>
                    <li><Link to="/help" title="Go to the help page">Help</Link></li>
                    <li><Link to="/help" title="Go to the help page">Help</Link></li>
                </ul>
            </div>
        </Fragment>
    )
}

export default SideBar;
