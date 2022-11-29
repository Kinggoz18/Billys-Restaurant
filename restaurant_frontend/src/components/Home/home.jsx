import React from 'react';
import './home.css'
import backgroundvideo from '../Videos/chicken1.mp4'
import DrumRockJerk from '../Images/logo.png'
//Button to place an order
function PlaceOrderButton(props){
  return(
    <div> 
       <button type="button" className='button'> Place order</button>
    </div>
  )
}

//Returns the home page
function Home(){
    return(
     <div className='homepage'>
        <video className="background_vid" src={backgroundvideo} autoPlay loop muted/>
          <div className='logo_name'>
            <img className='logo' src={DrumRockJerk}/>
            <p>Number 1. Island Cusine in Peterborough</p>
            <PlaceOrderButton />
          </div>
     </div>
    );
}

export default Home;
