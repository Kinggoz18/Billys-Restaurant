import { OrderObject } from './Objects/OrderObject.mjs';

let order = new OrderObject();

order.GetAllOrders().then(data => {
  let orderList = document.getElementById("total-order");
  data.forEach(order => {
    let orderItem = document.createElement("li");
    let itemString = "";
    order.items.forEach(item => {
      itemString += `<li>Name: ${item.name}</li><li>Price: $${item.price.toFixed(2)}</li><li>Quantity: ${item.orderCount}</li>`;
    });
    orderItem.innerHTML = `
      <h3>Customer Name: ${order.customerName}</h3>
      <ul>
        <li>Items:</li>
        <ul>
          ${itemString}
        </ul>
      </ul>`;
    orderList.appendChild(orderItem);
  });

  // Add search functionality
  let searchBox = document.getElementById("search-box");
  searchBox.addEventListener("keyup", function () {
    let query = searchBox.value.toLowerCase();
    orderList.childNodes.forEach(orderItem => {
      let customerName = orderItem.querySelector("h3").textContent;
      if (customerName.toLowerCase().includes(query)) {
        orderItem.style.display = "block";
      } else {
        orderItem.style.display = "none";
      }
    });
  });
}).catch(error => {
  console.log(error);
});
