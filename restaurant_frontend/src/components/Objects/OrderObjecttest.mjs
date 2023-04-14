import { Order } from "./OrderObject.mjs";

let order = new Order();

// Create order test
let ordersToCreate = [
  {
    _id: '12345',
    CustomerEmail: 'test1@example.com',
    CustomerName: 'Test User 1',
    PhoneNumber: '1234567890',
    items: [{ name: 'item1', price: 10 }, { name: 'item2', price: 20 }],
    orderdate: '2023-04-14T12:00:00Z',
    status: 'Pending',
    TotalPrice: 30,
  },
  {
    _id: '54321',
    CustomerEmail: 'test2@example.com',
    CustomerName: 'Test User 2',
    PhoneNumber: '1234567890',
    items: [{ name: 'item3', price: 15 }, { name: 'item4', price: 25 }],
    orderdate: '2023-04-15T12:00:00Z',
    status: 'Pending',
    TotalPrice: 40,
  },
  {
    _id: '54321',
    CustomerEmail: 'test2@example.com',
    CustomerName: 'Test User 2',
    PhoneNumber: '1234567890',
    items: [{ name: 'item3', price: 15 }, { name: 'item4', price: 25 }],
    orderdate: '2023-04-15T12:00:00Z',
    status: 'Pending',
    TotalPrice: 40,
  }
];

for (let i = 0; i < ordersToCreate.length; i++) {
  console.log(await order.CreateOrder(ordersToCreate[i]));
}

// Get all orders test
let orders = await order.GetAllOrders();
console.log("Orders", JSON.stringify(orders));

// Get orders by email test
let ordersByEmail = await order.GetAllOrdersByEmail("test1@example.com");
console.log(JSON.stringify(ordersByEmail));

