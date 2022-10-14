
import islandLogo from '../Images/IslandImg.png'

//Upperbackground 

export function UpperSection(){
    return(
        <div className="upperBackground">
            <div className="greyBox"></div>
                <div className="logo">
                    <div className="TextLogo">
                        <h1>DRUM ROCK JERK</h1>
                        <h3>MAXIMUM FLAVOUR!</h3>
                    </div>
                    <img className='PicLogo' src={islandLogo} alt='Drum Rock Jerk Logo'></img>
            </div>
        </div>
    )

}
