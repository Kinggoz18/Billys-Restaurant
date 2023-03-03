import React, {useEffect, useState} from "react";
import { Reviews } from "../Objects/ObjectExports.mjs";
import {IsInStorage, GetFromStorage} from '../LocalStorage'

import './Review.css'
const review = new Reviews();

export default function Review(){
    
    useEffect(() => {
        const SelectStar = () => {
          let stars = document.querySelectorAll('span.fa.fa-star.review-star');
          //Add event listener for hover
          stars.forEach(Element=>{
            Element.addEventListener("click", (event)=>{
              let currentStar = event.target;
              let value = currentStar.getAttribute("value");;
              while(currentStar!=null){
                currentStar.style.color = "var(--color-yellow)";
                currentStar = currentStar.previousSibling;
              }
              currentStar = event.target.nextSibling;
                  while(currentStar){
                    currentStar.style.color = "rgb(198, 198, 198)";
                    currentStar = currentStar.nextSibling;
                }
                document.querySelector('#rating-box').innerText = value;
            })
          })
        }
    
        SelectStar();
    
        return () => {
          // Clean up event listeners when component unmounts
          let stars = document.querySelectorAll('span.fa.fa-star.review-star');
          stars.forEach(Element=>{
            Element.removeEventListener("click", SelectStar);
          })
        }
      }, []);

    return(
        <div className="review-Page Page">
            <h1>Leave a review</h1>
            <p>Here at Drum Rock Jerk, we strive to give our <br></br>customers the very best experience and satisfy their <br></br>pallets</p>
            <p>Please leave a feedback below!</p>
            <div className="review-form">
                <input type='text' placeholder="Name..." id="review-name"></input>
                <textarea cols="20" rows="2" id="review-message" placeholder="Enter message.."></textarea>
                <div className="review-rating">
                    <span className="fa fa-star review-star" id="review-star1" value="1"></span>
                    <span className="fa fa-star review-star" id="review-star2" value="2"></span>
                    <span className="fa fa-star review-star" id="review-star3" value="3"></span>
                    <span className="fa fa-star review-star" id="review-star4" value="4"></span>
                    <span className="fa fa-star review-star" id="review-star5" value="5"></span>
                    <span id="rating-box" className="hide">0</span>
                </div>
                <button onClick={()=>CreateReview()}  id="send-reviewmsg">Send Message</button>
            </div>
            <ReviewLists/>
        </div>
    );
}

function ReviewLists() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        async function fetchReviews() {
            const reviewList = await review.getAllReviews();
            setReviews(reviewList);
        }

        fetchReviews();
    }, []);
    function GenerateRating(count) {
        let stars = [];
        for (let i = 0; i < count; i++) {
            stars.push(<span key={i} className="fa fa-star rating-star"></span>);
        }
        return stars;
    }
    return (
        <div className="review-list">
            <h1>Past Reviews</h1>
            <ul className="review-mainlist">
                {reviews.map((review, index) => (
                <div className="review-item" key={index}>
                    <p className="review-itemTitle">{review.name}</p>
                    <p className="review-itemDesc">{review.description}</p>
                    <p className="review-itemRating">{GenerateRating(review.rating)}</p>
                </div>
                ))}
            </ul>
        </div>
    );
}

function CreateReview(){

    let name = document.querySelector('#review-name').value;
    let description = document.querySelector('#review-message').value;
    let rating = document.querySelector('#rating-box').innerText;
    let userId = "";
    //Get the user id from cookies if login
    if(IsInStorage('AccountData')){
        let Account = GetFromStorage('AccountData')
            if(Account!=null){
            let account = JSON.parse(Account);
            let userId = account['_id']
        }
    }
    let reviewToPost = {
        Description: description,
        rating: rating,
        name: name,
        userId: userId
    }
    if(name!="" && description!="" && rating!=0){
        review.createReview(reviewToPost).then(()=>{
            window.location.reload();
        });
    }
    else{
        console.log("throw an error!");
    }

}


