import React from "react";
import './ContactUs.css'

export default function ContactUs(){
    return(
        <div className="contactUs-Page Page">
            <h1>Contact Us</h1>
            <p>Here at Drum Rock Jerk, we strive to give our <br></br>customers the very best experience and satisfy their <br></br>pallets</p>
            <p>Reach Out Today!</p>
            <form className="contactus-form">
                <input type='text' placeholder="Name..." id="contact-name"></input>
                <input type='text' placeholder="Phone number..." id="contact-number"></input>
                <input type='text' placeholder="Email..." id="contact-email"></input>
                <textarea cols="20" rows="2" id="contact-message" placeholder="Enter message.."></textarea>
                <button id="send-contactmsg">Send Message</button>
            </form>
        </div>
    );
}


