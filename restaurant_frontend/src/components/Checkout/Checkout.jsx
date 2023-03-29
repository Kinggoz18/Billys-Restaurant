import React, { useState,useEffect } from 'react';
import {GetFromStorage} from '../LocalStorage'
import {Order, Accounts, NotificationObject, PromoObject} from '../Objects/ObjectExports.mjs'

import './Checkout.css';


let AccountData = JSON.parse(GetFromStorage('AccountData'));
let OrderObj = new Order();
let NotificationObj= new NotificationObject();
let promoObj = new PromoObject();
let CustomerObj = new Accounts.CustomerAccount();
 
//Global Variables 
let PromoValue;

function Checkout() {
  const [couponSelected, setCouponSelected] = useState(false);
  const [pointsSelected, setPointsSelected] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);
  const [couponPopupVisible, setCouponPopupVisible] = useState(false);

  const [checkoutData, setCheckoutData] = useState(null);
  let data;
  useEffect(() => {
    data = JSON.parse(GetFromStorage('Checkoutdata'));
    console.log('Checkout data:', data);
    setCheckoutData(data);
  }, []);

  if (!checkoutData) {
    return <div>Loading...</div>;
  }
  console.log('Checkout items:', checkoutData);
  // Function to handle coupon selection
  function handleCouponSelection() {
    setCouponSelected(true);
    setPointsSelected(false);
  }

  // Function to handle points selection
  function handlePointsSelection() {
    setPointsSelected(true);
    setCouponSelected(false);
  }

  // Function to handle placing order
  function handlePlaceOrder() {
    setPopupVisible(true);
  }
  function PostOrder(){
    let data = JSON.parse(GetFromStorage('Checkoutdata'));

    let name = document.querySelector("#checkout-username").value;
    let email = document.querySelector("#checkout-useremail").value;
    let phone = document.querySelector("#checkout-userphone").value;

    let date = GetCurrentDate();
    let Order = {
      _id: "string",
      CustomerName: name,
      CustomerEmail: email,
      PhoneNumber: phone,
      items: [],
      orderdate: date,
      status: 'In progress',
      TotalPrice: 0
    }
    let total = 0;
    data.forEach(Element=>{
      let current = {
        _id: "string",
        Name: Element.name,
        Price: parseFloat(Element.price.replace("$", "")),
        menu: "string",
        OrderCount: Element.count,
        imageLink: "string"
      }
      total+= current.Price;
      Order.items.push(current);
    });
    Order['TotalPrice'] = total;
    OrderObj.CreateOrder(Order).then(data=>{
      if(data!=null){
        //Post the order
    if(AccountData!=null){
      CustomerObj.UpdateCustomerPoint(AccountData['_id']);
    }
      }
    });  
    NotificationObj.EmailPlacedOrder(Order, Order.CustomerName, Order.CustomerEmail);
    handlePlaceOrder();
  }
  // Function to handle submitting coupon code
  async function handleCouponSubmit() {
    // TODO: Apply coupon code
    let promoString = document.querySelector('#coupon-code');

    //PromoValue = await promoObj.GetPromo(promoString);
    // if(PromoValue == -1){
    //   //throw erroe
    // }
    // else{
    //   //update cart total and apply PromoValue discount
    // }
    setCouponPopupVisible(false);
  }
  let points;
    if(AccountData != null){
      points = AccountData['points'];
    }
  return (
    <div className='Page'>
      <div className="checkout-container">
        <h2 className="checkout-heading">Your Basket</h2>

        <div className="user-info">
        Reward Points: {points}
        </div>

        <div className="checkout-summary">
       {checkoutData.map((item, index) => (
            <li className="orderlist" key={index}>
              <span className='basket-name'>{item.name}</span>
              <span className='basket-price'>{item.price}</span>
              <span className='basket-count'>{item.count}</span>
            </li>
          ))}
        </div>
        <form className="checkout-form">
          <div>
            <label htmlFor="checkout-username">Contact Full name</label>
            <input id="checkout-username" type="text" placeholder="Enter your full name" />
            <span className='error'>Please enter a name for the order</span>
          </div>
          <div>
            <label htmlFor="checkout-useremail">Contact Email address</label>
            <input id="checkout-useremail" type="email" placeholder="Enter contact email" />
            <span className='error'>Please enter a contact email</span>
          </div>
          <div>
            <label htmlFor="checkout-userphone">Contact Phone number</label>
            <input id="checkout-userphone" type="text" placeholder="Enter contact phone" />
            <span className='error'>Please enter a contact phone number</span>
          </div>
        </form>
        <div className="payment-options">
          <h3>Have a cupon or want to use your points?</h3>
          <label id='payment_radio'>
            <input type="radio" name="payment" value="coupon" checked={couponSelected} onChange={handleCouponSelection} />
            Pay with Coupon
          </label>

          <label id='payment_points'>
            <input type="radio" name="payment" value="points" checked={pointsSelected} onChange={handlePointsSelection} />
            Pay with Points
          </label>

          {couponSelected && (
            <div className="coupon-section">
              <button className='couponbtn' onClick={() => setCouponPopupVisible(true)}>Enter Coupon </button>
            </div>
          )}
        </div>

        <button className="place-order-btn" onClick={()=> PostOrder()}>Place Order</button>

        {popupVisible && (
          <div className="popup-container">
            <div className="popup">
              <div className="popup-content">
                <p className="order-placed-notification">Your order has been placed!</p>
                <button className="popup-close-btn" onClick={() => setPopupVisible(false)}>Close</button>
              </div>
            </div>
          </div>
        )}

        {couponPopupVisible && (
          <div className="popup-container">
            <div className="popup">
              <div className="popup-content">
                <div className="coupon-section">
                  <label id='Entercoupon-btn' htmlFor="coupon-code">Enter Coupon Code:</label>
                  <input type="text" id="coupon-code" placeholder="Enter coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                </div>
                <button className="popup-submit-btn" onClick={handleCouponSubmit}>Submit</button>
                <button className="popup-cancel-btn" onClick={() => setCouponPopupVisible(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
function GetCurrentDate(){
  var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
return today;
}
export default Checkout;

