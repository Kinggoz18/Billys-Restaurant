import React from 'react';
import './Navbar.css';

const Navbar = () => (
  <nav className="app__navbar">
    
    <ul className=' app__navbar-links'>
      <li className='p__opensans'><a className="active" href="#Home"><i className="fa fa-fw fa-home"></i> Home</a></li>
      <li className='p__opensans'><a href="#about">About</a></li>
      <li className='p__opensans'><a href="#menu"> Menu</a></li>
      <li className='p__opensans'><a href="#awards">Points</a></li>
      <li className='p__opensans'><a href="#"><i className="fa fa-fw fa-envelope"></i> Contact</a></li>
    </ul>
    <div className='app__navbar-login'>
      <a href="#login" className='p__opensans'><i className="fa fa-fw fa-user"></i>  Log In/Register</a>
      <div />
        <a href="#cart"className='p__opensans'><i className="fa fa-shopping-cart"></i>Cart</a>
     
    </div>
  </nav>
);

export default Navbar;
