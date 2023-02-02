// Import the ReviewObject class
import { ReviewObject } from './ReviewObject.mjs';

// Create an instance of the ReviewObject class
const reviews = new ReviewObject();

// Add some reviews
reviews.createReview('John Doe', 'This is a great product!', 5);
reviews.createReview('Jane Doe', 'I love this product!', 4);
reviews.createReview('Jim Smith', 'I was not impressed with this product.', 2);
reviews.createReview('Dio Brando', 'Your Food Sucks nigga.', 1);
reviews.createReview('Sakura Haruno', 'Wasteman your food Sucks', 1);
reviews.createReview('Nina Einstein', 'I love this Peterborough Food!', 4.5);
reviews.createReview('Naruto Uzumaki', 'The food is alright i Guess add Ramen to the menu.', 2);


// Get all reviews
console.log(reviews.getAllReviews());


// Delete a review
console.log("==================================================")
//reviews.deleteReview('Dio Brando');

// Get all reviews again
console.log("===================================================")
console.log(reviews.getAllReviews());
