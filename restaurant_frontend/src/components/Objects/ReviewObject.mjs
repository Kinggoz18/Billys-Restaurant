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

export class Reviews {
  apiBaseURL = 'http://chigozie107-001-site1.itempurl.com/';
  
  // create a new review
  async createReview(review) {
    try {
      const endpoint = `${this.apiBaseURL}Reviews/CreateReviews`;
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

      // Update the customer's review list with the new review
      const customer = await this.getCustomerById(data.UserId);
      if (customer) {
        if (!customer.Reviews) {
          customer.Reviews = [];
        }
        customer.Reviews.push(data);
        await this.updateCustomer(customer);
      }
    } catch (error) {
      console.log(error)
    }
  }

  
  // get all reviews
  async getAllReviews() {
    const endpoint = `${this.apiBaseURL}Reviews/GetAllReviews`;
    const response = await fetch(endpoint);

    if (response.status != 200) {
      throw new Error(`Unable to get all reviews: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('All Reviews:', JSON.stringify(data));
  }

  // get reviews by user ID
  async getReviewsByUser(userId) {
    const endpoint = `${this.apiBaseURL}Reviews/GetReviews/${userId}`;
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`Unable to get reviews by user "${userId}": ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`Reviews by user "${userId}":`, data);
  }

  // delete review by ID
  async deleteReview(id) {
    const endpoint = `${this.apiBaseURL}Reviews/Delete?id=${id}`;
    const response = await fetch(endpoint, { method: 'DELETE' });

    if (!response.ok) {
      throw new Error(`Unable to delete review with ID "${id}": ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`Deleted review with ID "${id}":`, data);
  }
}

// test the functions
let reviews = new Reviews();
/* 
reviews.createReview({
  Title: 'Test Review 1',
  Description: 'This is a test review',
  Rating: 4,
  FirstName: 'Test User',
  UserId: '1'
}) */
//reviews.getAllReviews();


reviews.getReviewsByUser('1');

//reviews.deleteReview('1');