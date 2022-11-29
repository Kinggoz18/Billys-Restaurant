import React from 'react';

import './FooterOverlay.css';


function Footer(){
  return(
    <footer>
      <div className='footerLeft'>
        <i className="fa-regular fa-copyright"></i>
        <p>Drum Rock Jerk - 2022</p>
      </div>
      <div className='footerRight'>
        <i className="fa-brands fa-instagram"></i>
        <i className="fa-brands fa-facebook"></i>
        <i className="fa-brands fa-twitter"></i>
      </div>
    </footer>
  )
}

export default Footer;
