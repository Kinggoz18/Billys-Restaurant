// Import the ReviewObject class
import { ReviewObject } from './ReviewObject.mjs';

// Create an instance of the ReviewObject class
const reviews = new ReviewObject();

// Add some reviews
reviews.createReview('John Doe', 'This is a great product!', 5);
reviews.createReview('Jane Doe', 'I love this product!', 4);
reviews.createReview('Jim Smith', 'I was not impressed with this product.', 2);
reviews.createReview('Dio Brando', 'Your Food Sucks Nigga.', 1);

// Get all reviews
console.log(reviews.getAllReviews());


// Delete a review
reviews.deleteReview('Jim Smith');

// Get all reviews again
console.log(reviews.getAllReviews());
