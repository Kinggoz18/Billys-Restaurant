import './about.css'
import logo from '../Images/logo.png'


export default function AboutUs(){
    return(
        <div className='AboutPage Page'>
            <img className='about-logo' src={logo} alt='Drum Rock Jerk Logo'></img>
            <h1>About Us</h1>
            <span className='about-text'>
            Peterborough's Best Jamaican Restaurant!<br></br>
Are you craving the flavors of Jamaica? Look no further than Drum Rock Jerk, Peterborough's premier destination for authentic Jamaican cuisine. Our restaurant is the perfect place to experience the rich flavors and spices of the Caribbean, all in the heart of Peterborough.
At Drum Rock Jerk, we take pride in our commitment to using fresh, high-quality ingredients in all of our dishes. From our signature jerk chicken to our mouth-watering oxtail stew, our menu is sure to have something for everyone. Our Chef is originally from Jamaica and has more than 10 years of experience in Caribbean cuisine, so you can be sure that the flavors and recipes are authentic.
In addition to our delicious food, our restaurant also boasts a warm and inviting atmosphere. The interior design is inspired by Jamaica's vibrant culture, with colorful decorations and a laid-back atmosphere. Whether you're looking for a casual meal with friends or a romantic dinner for two, we have the perfect setting for you.
If you're looking for a taste of Jamaica in Peterborough, look no further than Drum Rock Jerk. Visit us today and experience the flavors of the Caribbean for yourself. We are located at 123 Main street, Peterborough.
            </span>
        </div>
    );
}