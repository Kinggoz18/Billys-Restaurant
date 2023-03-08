 /*======================================================================
| AccountObject
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
const apiBaseURL = "http://chigozie107-001-site1.itempurl.com/";
export class Order{
   //constructor to initialize orders to an array.
    constructor(){
      this.order = [];
    }

  //function to create an ordere
  async CreateOrder(order) {
  let dataToReturn;
  let body = JSON.stringify(order);
  try {
    // Make the AJAX call
    let endpoint = `${apiBaseURL}Orders/CreateOrder`;
    await fetch(endpoint, {
      method: 'POST',
      body: body,
      headers: { 'Content-Type': 'application/json' },
    }).then((response)=>{
      if (response.status!=200) {
        console.error(`Error creating order: ${response.statusText}`);
      }
      return response.json();
    }).then(data=>{
      const responseJson = data;
      dataToReturn = responseJson;
    });
  } catch (error) {
    console.error(`Error creating order: ${error}`);
    return null;
  }
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
//sends notification to restaurant to cancel order
async DeleteOrder(){}



}

    
    
