import React from "react";

export default function ContactUs(){
    return(
        <div className="Page">
            <h1>Contact Us</h1>
            <p></p>
            <p>Reach Out Today!</p>
            <form>
                <input type='text' placeholder="Name..." id="contact-name"></input>
                <input type='text' placeholder="Phone number..." id="contact-number"></input>
                <input type='text' placeholder="Email..." id="contact-email"></input>
                <textarea cols="20" rows="2" id="contact-message" placeholder="Enter message.."></textarea>
            </form>
        </div>
    );
}


