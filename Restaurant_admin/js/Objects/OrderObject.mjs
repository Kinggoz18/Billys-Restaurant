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
//import fetch from "node-fetch";
//const apiBaseURL = "http://chigozie107-001-site1.itempurl.com/";
export  class OrderObject{
  apiBaseURL = "http://chigozie107-001-site1.itempurl.com/";
   //constructor to initialize orders to an array.
    constructor(){
      this.order = [];
    }

  //function to create an ordere
  async CreateOrder(order) {
  let dataToReturn;
  try {
    // Calculate the total price
    let totalPrice = 0;
    for (let i = 0; i < order.items.length; i++) {
      totalPrice += order.items[i].price;
    }
    order.totalPrice = totalPrice;

    // Make the AJAX call
    const endpoint = `${this.apiBaseURL}Orders/CreateOrder`;
    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(order),
      headers: { 'Content-Type': 'application/json' },
    }).then((data)=>{
      if (data.status!=200) {
        console.error(`Error creating order: ${response.statusText}`);
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
  console.log("Data returned from API:", dataToReturn);
  return dataToReturn;
}
async GetAllOrders() {
  try {
    const endpoint = `${this.apiBaseURL}Orders/GetOrder`;
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.status !== 200) {
      console.error(`Error fetching orders: ${response.statusText}`);
      throw new Error(response.statusText);
    }
    const data = await response.json();
    console.log("Response JSON:", data);
    return data;
  } catch (error) {
    console.error(`Error fetching orders: ${error}`);
    return null;
  }
}

//sends notification to restaurant to cancel order
async DeleteOrder(){}



}

let order = new OrderObject();
await order.GetAllOrders();

    
