// Import the ReviewObject class
import { ReviewObject } from './ReviewObject.mjs';

const reviews = new ReviewObject();


// test the functions
reviews.createReview({
  Title: 'Test Review 1',
  Description: 'This is a test review',
  Rating: 4,
  FirstName: 'Test User',
  UserId: '1'
});

reviews.getAllReviews();

reviews.getReviewsByUser('1');

reviews.deleteReview('1');
