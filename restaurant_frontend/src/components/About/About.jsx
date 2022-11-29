import './about.css'
import logo from '../Images/logo.png'


export default function AboutUs(){
    return(
        <div className='AboutPage Page'>
            <img className='about-logo' src={logo} alt='Drum Rock Jerk Logo'></img>
            <h1>About Us</h1>
            <span className='about-text'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ligula leo, ullamcorper ut dapibus at, dignissim in elit. Aenean porttitor turpis ac eros mollis venenatis. Mauris justo quam, lobortis vitae erat laoreet, dictum elementum purus. Proin varius elit at consequat tristique. Fusce finibus, purus in rutrum mattis, nibh metus semper ipsum, in eleifend ligula purus suscipit arcu. Nunc accumsan vel nisi at sodales. Phasellus dolor dolor, feugiat sed lorem at, finibus tincidunt augue.
            </span>
        </div>
    );
}