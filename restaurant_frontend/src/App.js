import React from 'react';

import { FindUs, Footer } from './container';
import { Navbar } from './components/index';
import './App.css';
import backgroundvideo from './Videos/chicken1.mp4'


const App = () => {
  return (
    <div>
      <Navbar />
       <div className='homepage'>
        <video className="background_vid" src={backgroundvideo} autoPlay loop muted/>
        
      </div>

      <div className='logo_name'>
        <p>DRUM ROCK JERK</p>
        <p>Maximum Flavour!</p>
        <p>Number 1. Island Cusine in Peterborough</p>
      </div>

<<<<<<< HEAD
     <button type="button"> Place order</button>
=======
     <button type="button" className='button'> Place order</button>

>>>>>>> d30d26d149fb6c0faa1306abd0fd4678afa501df
      <FindUs />
      <Footer />
    </div>

  );
}



export default App;
