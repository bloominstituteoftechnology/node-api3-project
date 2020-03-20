import React from 'react';
//import { useLocation } from 'react-router-dom';
import Navigation from './Navigation';
const Home = () => {
  //  const location = useLocation();
    return(
        <div>
        <Navigation />
            <img
                //className={location.pathname === '/api/users' ? 'active' : ''}
                src="https://images.unsplash.com/photo-1507919909716-c8262e491cde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80"
                alt="computer"
        />
        </div>
    )
}
export default Home;