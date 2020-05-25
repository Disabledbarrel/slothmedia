import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const  SideBar = () => {
    return (
        <Fragment>
            <div className="small-menu">
                <ul>
                    <li><Link to="/about" title="Go to the about page">About</Link></li>
                    <li><Link to="/terms" title="Go to the terms page">Terms</Link></li>
                </ul>
            </div>
        </Fragment>
    )
}

export default SideBar;
