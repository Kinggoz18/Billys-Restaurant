import React from 'react';
import {Link} from 'react-router-dom'
import './home.css'
import backgroundvideo from '../Videos/chicken1.mp4'
import DrumRockJerk from '../Images/logo4.png'
//Button to place an order
function PlaceOrderButton(props){
  return(
    <div> 
       <Link to='/Menu' type="button" className='button'> Place order</Link>
    </div>
  )
}

//Returns the home page
class Home extends React.Component{
  render(){
    return(
     <div className='homepage'>
        <video className="background_vid" src={backgroundvideo} autoPlay loop muted/>
          <div className='logo_name'>
            <img className='logo' src={DrumRockJerk} alt='Drum Rock Jerk Logo'/>
            <p>Number 1. Island Cusine in Peterborough</p>
            <PlaceOrderButton />
          </div>
     </div>
    );
  }
}

export default Home;
