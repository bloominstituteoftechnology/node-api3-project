import React from 'react';
import { Link, Route, useLocation } from 'react-router-dom';
import { NavLink, NavbarBrand, Navbar } from 'reactstrap';
import UsersList from './components/UserList';
import AddUser from './components/AddUser';
import './App.css';

function App() {
  const location = useLocation();
  return (
    <div className="App">
     <h1>Hello from the app</h1>
     <Navbar>
        <NavbarBrand tag={Link} to="/" className="mr-auto">
          Blog app
        </NavbarBrand>
        <NavLink tag={Link} to="/api/posts"> View all Users</NavLink>
        <NavLink tag={Link} to="/"> Home </NavLink>
        <NavLink tag={Link} to="/api/newpost"> AddUser </NavLink>
      </Navbar>
      <Route path="/api/posts" component={UsersList} />
      <Route path="/api/newpost" component={AddUser} />
      {/* <img
        className={location.pathname === '/api/posts' ? 'active' : ''}
        src="https://images.unsplash.com/photo-1487611459768-bd414656ea10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
        alt="computer"
      /> */}
    </div>
  );
}

export default App;
