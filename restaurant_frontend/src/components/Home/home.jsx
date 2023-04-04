import React from 'react';
import {Link} from 'react-router-dom'
import './home.css'
import DrumRockJerk from '../Images/logo4.png'
import SubTitle from '../Images/subheading.svg'

// Import the Cloudinary classes. 
import {AdvancedVideo} from '@cloudinary/react';
import {Cloudinary, CloudinaryVideo} from "@cloudinary/url-gen";
import { quality} from "@cloudinary/url-gen/actions/delivery";
import {auto} from "@cloudinary/url-gen/qualifiers/format";


//Component for the large videa
const HomeVideo_large = React.memo(()=>{;

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_ID
  }
});

// Use the video with public ID, 'your_video_public_id'.
const myVideo = cld.video('Home/chicken1_mnitxl');
new CloudinaryVideo(myVideo).delivery(quality(50)).transcode(auto());


return (
  <div>
    <AdvancedVideo cldVid={myVideo} className="background_vid" autoPlay muted playsInline controls={false} loop />
  </div>
);
});
//Component for the mobile videa
const HomeVideo_small = React.memo(()=>{;

  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_ID
    }
  });
  
  // Use the video with public ID, 'your_video_public_id'.
  const myVideo = cld.video('Home/chicken_smallScreen_lw9cz3');
  new CloudinaryVideo(myVideo).delivery(quality(50)).transcode(auto());
  
  
  return (
    <div>
      <AdvancedVideo cldVid={myVideo} className="background_vid" autoPlay muted playsInline controls={false} loop />
    </div>
  );
  });

//Button to place an order
function PlaceOrderButton(props){
  return(
    <div> 
       <Link to='/Menu' type="button" className='home-button'> Order Now!</Link>
    </div>
  )
}

//Returns the home page
class Home extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      screenWidth: window.innerWidth
    };
    this.handleResize = this.handleResize.bind(this);
  }
  handleResize() {
    this.setState({ screenWidth: window.innerWidth });
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render(){
    const { screenWidth } = this.state;
    const VideoSource = screenWidth < 768 ? HomeVideo_large : HomeVideo_small;
    return(
     <div className='homepage'>
        <VideoSource/>
          <div className='logo_name'>
            <img className='logo' src={DrumRockJerk} alt='Drum Rock Jerk Logo'/>
            <img className='sub-logo' src={SubTitle} alt='Drum Rock Jerk Number 1 in Peterborough!'/>
            <PlaceOrderButton />
          </div>
     </div>
    );
  }
}

export default Home;
