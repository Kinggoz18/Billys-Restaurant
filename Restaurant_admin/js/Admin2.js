/* 
import { OrderObject } from './Objects/OrderObject.mjs';
const ordersList = document.getElementById('orders-list');
const btnDisplayOrders = document.getElementById('btn-display-orders');

btnDisplayOrders.addEventListener('click', async () => {
  const orderObject = new OrderObject();
  const orders = await orderObject.GetAllOrders();
  displayAllOrders(orders);
});

function displayAllOrders(orders) {
  ordersList.innerHTML = '';
  orders.forEach(order => {
    const li = document.createElement('li');
    li.textContent = `Order ID: ${order.orderId} | Total Price: ${order.totalPrice}`;
    ordersList.appendChild(li);
  });
} */