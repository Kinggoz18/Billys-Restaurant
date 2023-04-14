 /*======================================================================
| MenuItemObject
|
| Name: PromoObject.js
|
| Written by: Chigozie Muonagolu - March 2023
|
| Purpose: Communicate with the backend/API.
|
| usage: used in services that requires it.
|
| Description of properties: None
|
|------------------------------------------------------------------
*/
//Object for promo
export class PromoObject{

  //Default constructor 
  constructor(){
      //Base url
      this.apiBaseURL = "http://chigozie107-001-site1.itempurl.com/";
  }

  // Method to create a promo
  async CreatePromo(promo) {
  try {
    // Make the AJAX call
    // Construct the endpoint URL for creating an promo
    const endpoint = `${this.apiBaseURL}Promo/AddPromo`;
    // Make the AJAX call
      const response = await fetch(endpoint, {
        method: 'PUT',
        body: JSON.stringify(promo),
        headers: { 'Content-Type': 'application/json' },
      });
  
      // Wait for the response body to be retrieved
      const responseBody = await response.text();
  
      // Check if the response is not successful
      if (response.status !== 200) {
        console.error(`Error creating promo: ${response.statusText}`);
      }
  
       return responseBody;
  } catch (error) {
      console.error(`Error creating promo: ${error}`);
      }
  }
  //Delete a promo
  async DeletePromo(promo){
      try{
          let response = await fetch(`${this.apiBaseURL}Promo/DeletePromo/${promo}`, {
              method: "DELETE",
          })
          let responseBody = await response.text();
          if(responseBody==400){

              return false;
          }
          return true;
      }
      catch(error){
          console.log(error);
          return null;
      }
  }
  //Checks if a promo is valid
  async IsPromoValid(promo){
  try {
    // Make the AJAX call
    // Construct the endpoint URL for creating an promo
    const endpoint = `${this.apiBaseURL}Promo/IsValidPromo/${promo}`;
    // Construct the endpoint URL for creating an promo
    let response  = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    let responseBody = await response.text();
    if (responseBody==400) {
        return false;
      }
      return true;
  } catch (error) {
    console.error(`Error creating promo: ${error}`);
    return null;
  }
  }
  //Returns all the promo
  async GetAllPromos(AdminId){
  let dataToReturn;
  try {
    // Make the AJAX call
    // Construct the endpoint URL for creating an promo
    const endpoint = `${this.apiBaseURL}Promo/GetAllPromo/${AdminId}`;
    // Construct the endpoint URL for creating an promo
    const response = await fetch(endpoint, {
      method: 'GET',
    });
      dataToReturn = await response.json();
      // Check if the response is not successful
      if (response.status!=200) {
        // Parse the response JSON and set it to dataToReturn variable
        console.error(`Error creating promo: ${response.statusText}`);
      }
      return dataToReturn;
  } catch (error) {
    console.error(`Error creating promo: ${error}`);
    return null;
  }
  }
   //Returns a promo value
   async GetPromo(promoString){
      let dataToReturn;
      try {
        // Make the AJAX call
        // Construct the endpoint URL for creating an promo
        const endpoint = `${this.apiBaseURL}Promo/GetPromo/${promoString}`;
        // Construct the endpoint URL for creating an promo
        const response = await fetch(endpoint, {
          method: 'GET',
        });
          dataToReturn = await response.text();
          // Check if the response is not successful
          if (response.status!=200) {
            // Parse the response JSON and set it to dataToReturn variable
            console.error(`Error creating promo: ${response.statusText}`);
          }
          if(dataToReturn == -1){
              return false;
          }
          return dataToReturn;
      } catch (error) {
        console.error(`Error creating promo: ${error}`);
        return null;
      }
      }
}
