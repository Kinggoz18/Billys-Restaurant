 /*======================================================================
| OrderObject
|
| Name: OrderObject.js
|
| Written by: Tobi Akinnola- Febuary 2023
|
| Purpose: Communicate with the backend/API.
|
| usage: used in services that requires it.
|
| Description of properties: None
|https://drumrockjerkapi-v1.azure-api.net/drumrockjerk/whatever-endpoint
|------------------------------------------------------------------
*/

// Set the API base URL
const apiBaseURL = "http://chigozie107-001-site1.itempurl.com/";
// Define the Order class
export class Order{
   //constructor to initialize orders to an array.
    constructor(){
      // Constructor to initialize orders to an array
      this.order = [];
    }

// Function to create an order by making an AJAX call to the API
  async CreateOrder(order) {
  let dataToReturn;
  try {

    // Make the AJAX call
    // Construct the endpoint URL for creating an order
    const endpoint = `${apiBaseURL}Orders/CreateOrder`;
    // Construct the endpoint URL for creating an order
    await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(order),
      headers: { 'Content-Type': 'application/json' },
    }).then((data)=>{
      // Check if the response is not successful
      if (data.status!=200) {
        // Parse the response JSON and set it to dataToReturn variable
        console.error(`Error creating order: ${data.statusText}`);
      }
      return data.json();
    }).then(data=>{
      const responseJson = data;
      console.log("Response JSON:", responseJson);
      dataToReturn = responseJson;
    });
  } catch (error) {
    console.error(`Error creating order: ${error}`);
    return null;
  }
  // Log the data returned from the API and return it
  console.log("Data returned from API:", dataToReturn);
  return dataToReturn;
}





async  GetAllOrders() {
  let dataToReturn;
  let response;
  try {
    const endpoint = `${apiBaseURL}Orders/GetOrder`;
    response = await fetch(endpoint, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },

    }).then(data => {
       //chek if response if succesful 
      if (data.status !== 200) {
        console.error(`Error fetching orders: ${response.statusText}`);
        throw new Error(data.statusText);
      }
      return data.json();

    }).then(data => {
      const responseJson = data;
      console.log("Response JSON:", responseJson);
      dataToReturn = responseJson;

    });

  } catch (error) {
    console.error(`Error fetching orders: ${error}`);
    return null;
  }
  console.log("Data returned from API:", dataToReturn);

    
}
// //sends notification to restaurant to cancel order
// async DeleteOrder(orderid){
//   let dataToReturn;
//   try {
//     //construct the endpoint url for deleting order
//     response = await fetch(endpoint, {
//       method: 'DELETE',
//       headers: {'content-Type': 'application/json'},
//     }).then(data =>{
//       //chek if response if succesful 
//       if(data.status != 200){
//         console.error(`Error canceling order: ${data.statusText}`);
//       }
//       return data.json();
//     }).then((data)=>{
//       // Parse the response JSON and set it to dataToReturn variable
//   const responseJson = data;
//   //console.log is for debugging
//   console.log("Response JSON:", responseJson);
//   dataToReturn = responseJson;
//     });
//   } catch (error) {
//     console.error(`Error canceling order: ${error}`);
//     return null;
//     }
    
//     // Log the data returned from the API and return it
//     console.log("Data returned from API:", dataToReturn);
//     return dataToReturn;
//     }







//get orders by useremail
async GetAllOrdersByEmail(useremail) {
  let dataToReturn;
  try {
    const endpoint = `${apiBaseURL}Orders/GetOrdersByEmail/${encodeURIComponent(useremail)}`;
    console.log(endpoint);
      await fetch(endpoint,
      {method: 'GET'}).then(data => {
      if (data.status !== 200) {
        console.error(`Error fetching orders: ${data.statusText}`);
        throw new Error(data.statusText);
      }
      return data.json();

    }).then(data => {
      const responseJson = data;
      console.log("Response JSON:", responseJson);
      dataToReturn = responseJson;
    });
    return dataToReturn;
  } catch (error) {
    console.error(error);
    return null;
  }
}

}

    
    
