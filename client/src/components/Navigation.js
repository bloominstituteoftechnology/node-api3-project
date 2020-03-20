import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink, NavbarBrand, Navbar } from 'reactstrap';

const Navigation = () => {
    return(
        <div>
        <Navbar>
            <NavbarBrand tag={Link} to="/" className="mr-auto">
            Posts app
            </NavbarBrand>
            <NavLink tag={Link} to="/api/posts"> View all Users</NavLink>
            <NavLink tag={Link} to="/"> Home </NavLink>
            <NavLink tag={Link} to="/api/newpost"> AddUser </NavLink>
        </Navbar>
        </div>
    )
}
export default Navigation;