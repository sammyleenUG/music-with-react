import React from 'react';
import './navbar.css';

const Navbar = (props) => (
    <nav className="navbar bg-light navbar-fixed-top">
        <form className="container-fluid">
            <div className="input-group">
                <span className="input-group-text" id="basic-addon1">Music</span>
                <input type="text" onChange={props.onChangeListener} className="form-control" placeholder="type song | artist " />
            </div>
        </form>
    </nav>
);

export default Navbar;