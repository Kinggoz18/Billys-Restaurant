import React from 'react'
import location from '../Images/location.jpg'
import './location.css'

function Location(){
    return(
        <div className='Page'>
            <h1 className='location-h1'>Find us at</h1>
            <img className="location-img" src={location} alt='Drum Rock Jerk Location'></img>
            <div className='location-text'>
                <i className="fa-solid fa-location-dot"></i>
                <p>123 Location st, Peterborough, Ontario</p>
            </div>
        </div>
    )
}

export default Location;