/*======================================================================
| Review Object
|
| Name: ReviewsObject.js
|
| Written by: Williams Agbo - Febuary 2023
|
| Purpose: Communicate with the backend/API.
|
| usage: used in services that requires it.
|
| Description of properties: None
|
|------------------------------------------------------------------
*/
export class ReviewObject {
    constructor() {
      // Initialize an empty array to store reviews
      this.reviews = [];
    }
  
    createReview(customer, review, rating) {
      // Check if the customer name and review are provided
      if (!customer || !review) {
        throw new Error('Invalid review: customer name and review must be provided');
      }
  
      // Check if the rating is within the desired range
      if (rating < 1 || rating > 5) {
        throw new Error('Invalid rating: rating must be between 1 and 5');
      }
  
      // Adds a new review to the reviews array with the specified rating
      this.reviews.push({ customer, review, rating });
    }
  
    deleteReview(customer) {
      // Removes the review for the specified customer
      this.reviews = this.reviews.filter(r => r.customer !== customer);
    }
  
    getAllReviews() {
      // Sorts the reviews array in descending order by the rating property
      this.reviews.sort((a, b) => b.rating - a.rating);
      // Returns all reviews stored in the reviews array
      return this.reviews;
    }
  }
  
  
  
  
  
  