import React from 'react';
import './Navbar.css';

export default function Navbar(props){
  return(
    <div>
        <nav className="app__navbar">
          <ul className=' app__navbar-links'>
            <li className='p__opensans'><a href="#menu"> Menu</a></li>
            <li className='p__opensans'><a href="#about">Location</a></li>
            <li className='p__opensans'><a href="#awards">About</a></li>
            <li className='p__opensans'><a href="#Contact"><i className="fa fa-fw fa-envelope"></i> Contact us</a></li>
          </ul>
    <div className='app__navbar-login'>
        <a href="#login" className='p__opensans'><i className="fa fa-fw fa-user"></i>Login</a>
        <a href="#cart"className='p__opensans'><i className="fa fa-shopping-cart"></i>Cart</a>
      </div>
        </nav>
    </div>
  );
};
