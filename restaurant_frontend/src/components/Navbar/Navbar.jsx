import React from 'react';



import images from '../../constants/images';


import './Navbar.css';

const Navbar = () => (
  <nav className="app__navbar">
    
    <ul className=' app__navbar-links'>
      <li className='p__opensans'><a class="active" href="#Home"><i class="fa fa-fw fa-home"></i> Home</a></li>
      <li className='p__opensans'><a href="#about">About</a></li>
      <li className='p__opensans'><a href="#menu"> Menu</a></li>
      <li className='p__opensans'><a href="#awards">Points</a></li>
      <li className='p__opensans'><a href="#"><i class="fa fa-fw fa-envelope"></i> Contact</a></li>
    </ul>
    <div className='app__navbar-login'>
      <a href="#login" className='p__opensans'><i class="fa fa-fw fa-user"></i>  Log In/Register</a>
      <div />
        <a href="#cart"className='p__opensans'><i class="fa fa-shopping-cart"></i> cart</a>
     
    </div>
  </nav>
);

export default Navbar;
