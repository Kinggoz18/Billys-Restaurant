import React, { useState,useEffect } from 'react';
import {GetFromStorage} from '../LocalStorage'

import './Checkout.css';





function Checkout() {
  const [totalPoints, setTotalPoints] = useState(100);
  const [couponSelected, setCouponSelected] = useState(false);
  const [pointsSelected, setPointsSelected] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);
  const [couponPopupVisible, setCouponPopupVisible] = useState(false);

  const [checkoutData, setCheckoutData] = useState(null);

  useEffect(() => {
    const data = JSON.parse(GetFromStorage('Checkoutdata'));
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
    // TODO: Place the order
    setOrderPlaced(true);
    setPopupVisible(true);
  }

  // Function to handle submitting coupon code
  function handleCouponSubmit() {
    // TODO: Apply coupon code
    setCouponPopupVisible(false);
  }
  
  return (
    <div className='Page'>
      <div className="checkout-container">
        <h2 className="checkout-heading">Checkout</h2>

        <div className="user-info">
          <p>You are Logged in </p>
          <p>Total Points: {totalPoints}</p>
        </div>

        <div className="order-summary">
       {checkoutData.map((item, index) => (
            <li className="orderlist" key={index}>
              <span id='name'>Name: {item.name}</span>
              <span id='price'>Price: {item.price}</span>
              <span id='Count'>Quantity: {item.count}</span>
            </li>
          ))}
        </div>

        <div className="payment-options">
          <h3>Payment Options</h3>
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
              <button onClick={() => setCouponPopupVisible(true)}>Enter Coupon </button>
            </div>
          )}
        </div>

        <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>

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

export default Checkout;
