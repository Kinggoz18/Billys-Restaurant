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
      let check = await this.CheckText(review.Description);
      if(check === false){
        return;
      }
      const endpoint = `${this.apiBaseURL}Reviews/CreateReviews`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
       },
        body: JSON.stringify(review)
      });
      if (!response.ok) {
        throw new Error(`Unable to create review: ${response.statusText}`);
      }
      const data = await response.text();
      console.log('Created Review:', data);

    } catch (error) {
      console.log(error)
    }
  }

  
  // get all reviews
  async getAllReviews() {
    const endpoint = `${this.apiBaseURL}Reviews/GetAllReviews`;
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'}});

    if (response.status != 200) {
      throw new Error(`Unable to get all reviews: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  }

  // get reviews by user ID
  async getReviewsByUser(userId) {
    const endpoint = `${this.apiBaseURL}Reviews/GetReviews/${userId}`;
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`Unable to get reviews by user "${userId}": ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  }

  // delete review by ID
  async deleteReview(id) {
    const endpoint = `${this.apiBaseURL}Reviews/Delete?id=${id}`;
    const response = await fetch(endpoint, { method: 'DELETE' });

    if (!response.ok) {
      throw new Error(`Unable to delete review with ID "${id}": ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  }
  //Checks if a review contains profanity
  async CheckText(review){
    var myHeaders = new Headers();
    myHeaders.append("apikey", process.env.REACT_APP_BAD_WORDS_API_KEY);
    let check = true;
    var requestOptions = {
      method: 'POST',
      redirect: 'follow',
      headers: myHeaders,
      body: review
    };
    
    await fetch("https://api.apilayer.com/bad_words?censor_character=censor_character", requestOptions)
      .then(response => {
        if (!response.ok)
        {
          return;
        }
        return response.json();
      })
      .then(result =>{
        if(result["bad_words_total"] > 0){
          check = false;
        }
        else{
          check = true;
        }
      })
      .catch(error => console.log('error', error));
      return check;
  }
}