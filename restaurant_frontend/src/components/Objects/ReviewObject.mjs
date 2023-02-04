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

const apiBaseURL = 'https://drumrockjerkapi-v1.azure-api.net/drumrockjerk/';

// create a new review
async function createReview(review) {
  try {
    const endpoint = `${apiBaseURL}Reviews/CreateReviews`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review)
  });

  if (!response.ok) {
    throw new Error(`Unable to create review: ${response.statusText}`);
  }

  const data = await response.json();
  console.log('Created Review:', data);
  } catch (error) {
    console.log(error)
  }
}

// get all reviews
async function getAllReviews() {
  const endpoint = `${apiBaseURL}Reviews/GetAllReviews`;
  const response = await fetch(endpoint);

  if (response.status!=200) {
    throw new Error(`Unable to get all reviews: ${response.statusText}`);
  }

  const data = await response.json();
  console.log('All Reviews:', JSON.stringify(data));
}

// get reviews by user ID
async function getReviewsByUser(userId) {
  const endpoint = `${apiBaseURL}Reviews/GetReviews/${userId}`;
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Unable to get reviews by user "${userId}": ${response.statusText}`);
  }

  const data = await response.json();
  console.log(`Reviews by user "${userId}":`, data);
}

// delete review by ID
async function deleteReview(id) {
  const endpoint = `${apiBaseURL}Reviews/Delete?id=${id}`;
  const response = await fetch(endpoint, { method: 'DELETE' });

  if (!response.ok) {
    throw new Error(`Unable to delete review with ID "${id}": ${response.statusText}`);
  }

  const data = await response.json();
  console.log(`Deleted review with ID "${id}":`, data);
}


//getAllReviews();

//getReviewsByUser('1');

//deleteReview('1');
