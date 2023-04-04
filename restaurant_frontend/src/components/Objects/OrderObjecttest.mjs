import { Order } from "./OrderObject.mjs";
const orderObject = new Order();

const orderData = {
    // pass valid order data here
  };
  orderObject.CreateOrder(orderData)
    .then(data => {
      console.log("Data returned from API:", data);
      // add further assertions here to check if the data is valid
    })
    .catch(error => {
      console.error(error);
      // add further assertions here to check if the error is valid
    });

    
    orderObject.GetAllOrders()
  .then(data => {
    console.log("Data returned from API:", data);
    // add further assertions here to check if the data is valid
  })
  .catch(error => {
    console.error(error);
    // add further assertions here to check if the error is valid
  });
  const userEmail = "test@example.com";
  orderObject.GetAllOrdersByEmail(userEmail)
    .then(data => {
      console.log("Data returned from API:", data);
      // add further assertions here to check if the data is valid
    })
    .catch(error => {
      console.error(error);
      // add further assertions here to check if the error is valid
    });
  