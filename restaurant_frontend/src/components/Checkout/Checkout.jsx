import React, { useState,useEffect } from 'react';
import {GetFromStorage} from '../LocalStorage'
import {Order, Accounts} from '../Objects/ObjectExports.mjs'

import './Checkout.css';


let AccountData = JSON.parse(GetFromStorage('AccountData'));
let OrderObj = new Order();
let CustomerObj = new Accounts.CustomerAccount();
 
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
    let data = JSON.parse(GetFromStorage('Checkoutdata'));

    let name = document.querySelector("#checkout-username");
    let email = document.querySelector("#checkout-useremail");
    let phone = document.querySelector("#checkout-userphone");


    let Order = {
      CustomerName: name,
      CustomerEmail: email,
      PhoneNumber: phone,
      items: [],
      orderDate: GetCurrentDate(),
      status: 'In progress',
      TotalPrice: 0
    }
    data.forEach(Element=>{
      let current = {
        
      }
    });
    OrderObj.CreateOrder(data)
    setPopupVisible(true);
  }

  // Function to handle submitting coupon code
  function handleCouponSubmit() {
    // TODO: Apply coupon code
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
            <label htmlFor="checkout-username">Full name</label>
            <input id="checkout-username" type="text" placeholder="Enter your full name" />
          </div>
          <div>
            <label htmlFor="checkout-useremail">Email Address</label>
            <input id="checkout-useremail" type="email" placeholder="Enter contact email" />
          </div>
          <div>
            <label htmlFor="checkout-userphone">Phone Number</label>
            <input id="checkout-userphone" type="text" placeholder="Enter contact phone" />
          </div>
        </form>
        <div className="payment-options">
          <h3>Have a cupon or want to use your points?</h3>
          <label>
            <input type="radio" name="payment" value="coupon" checked={couponSelected} onChange={handleCouponSelection} />
            Pay with Coupon
          </label>

          <label>
            <input type="radio" name="payment" value="points" checked={pointsSelected} onChange={handlePointsSelection} />
            Pay with Points
          </label>

          {couponSelected && (
            <div className="coupon-section">
              <button className='couponbtn' onClick={() => setCouponPopupVisible(true)}>Enter Coupon </button>
            </div>
          )}
        </div>

        <button className="place-order-btn" onClick={()=> handlePlaceOrder()}>Place Order</button>

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
}
export default Checkout;
