/** React Imports */
import React, { useState,useEffect } from 'react';
import { json, Navigate } from 'react-router-dom';

/** Objects and helper function Imports */
import {GetFromStorage, AddToStorage} from '../LocalStorage'
import {Order, Accounts, NotificationObject, PromoObject} from '../Objects/ObjectExports.mjs'
import { CalculateTotalCost } from '../Menu/Menu';
import { formatCurrency } from '../Navbar/Navbar';
import { ValidateEmail, validatePhone } from '../Accounts/Login';
/* Module export */
import $ from 'jquery'

/** Css Imports */
import './Checkout.css';


let AccountData = JSON.parse(GetFromStorage('AccountData'));
let OrderObj = new Order();
let NotificationObj= new NotificationObject();
let promoObj = new PromoObject();
let CustomerObj = new Accounts.CustomerAccount();


function Checkout() {
  //Checkout useSate variables
  const [couponSelected, setCouponSelected] = useState(false);
  const [pointsSelected, setPointsSelected] = useState(false);
  const [pointsApplied, setpointsApplied] = useState(false);
  const [OrderPlaced, setorderPlaced] = useState(false);
  
  const [points, setPoints] = useState(AccountData ? AccountData.points : 0);
  const [OrderCost, setOrderCost] = useState(CalculateTotalCost());
  const [TaxCost, setTaxCost] = useState(ApplyTax(OrderCost));
  const [couponCode, setCouponCode] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);
  const [couponPopupVisible, setCouponPopupVisible] = useState(false);

  let PromoApplied = false;
  const [checkoutData, setCheckoutData] = useState(null);
  let data;
  //Monitor changes in checkout data
  useEffect(() => {
    data = JSON.parse(GetFromStorage('Checkoutdata'));
    setCheckoutData(data);
  }, []);

  if (!checkoutData) {
    return <div>Loading...</div>;
  }
  // Function to handle coupon selection
  function handleCouponSelection() {
    setCouponSelected(true);
  }

  // Function to handle points selection
  async function handlePointsSelection() {
    if(!pointsApplied)
    {
      if(points < 50){
        alert('Not enough points!');
      }
      else{
        if(AccountData!=null){
          let newPoint = points - 50;
          setPoints(newPoint);
          setpointsApplied(true);
          setTaxCost(0);
          setOrderCost(0); 
        }
      }
      setPointsSelected(true);
    }
  }

  // Function to handle placing order
  function handlePlaceOrder() {
    setPopupVisible(true);
  }
  //Function to make call OrderObj and post order
  function PostOrder(){
    //Validate contact data first
    if(ValidateCreate())
    {
      let data = JSON.parse(GetFromStorage('Checkoutdata'));

      let name = document.querySelector("#checkout-username").value;
      let email = document.querySelector("#checkout-useremail").value;
      let phone = document.querySelector("#checkout-userphone").value;
  
      let date = GetCurrentDate();
      //Prepare the order object
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
      //Add each item to the items array of the order object
      data.forEach(Element=>{
        let current = {
          _id: "string",
          Name: Element.name,
          Price: parseFloat(Element.price.replace("$", "")),
          menu: "string",
          OrderCount: Element.count,
          imageLink: "string"
        }
        Order.items.push(current);
      });
      //Update the total cost 
      if(pointsApplied){
        Order['TotalPrice'] = formatCurrency(0);
      }else{
        Order['TotalPrice'] = formatCurrency((OrderCost + TaxCost).toFixed(2));
      }
      OrderObj.CreateOrder(Order).then(data=>{            //Post the order
      if(data!=null){
        if(pointsApplied){  //Update the points
            AccountData.points -= 50;
            AddToStorage('AccountData', JSON.stringify(AccountData));
            CustomerObj.UseCustomersPoints(AccountData['_id']);
          }
      else if(AccountData!=null){
        CustomerObj.UpdateCustomerPoint(AccountData['_id']);  //Update the point in DB and in session 
        AccountData.points += 10;
        AddToStorage('AccountData', JSON.stringify(AccountData));
      }
        }
      });  
      NotificationObj.EmailPlacedOrder(Order, Order.CustomerName, Order.CustomerEmail);
      handlePlaceOrder();
      //Wait 2 seconds then reset order cost on a successful order
      setTimeout(()=>{
        setOrderCost(0);
        setorderPlaced(true);
      }, 2000);
    }
  }
  // Function to handle submitting coupon code
  async function handleCouponSubmit() {
    if(!PromoApplied){
      let promoString = document.querySelector('#coupon-code').value;

      let PromoValue = await promoObj.GetPromo(promoString);
      if(PromoValue === false){
          alert('Invalid Promo Entered!');
        }
      else{
        let cost = CalculateTotalCost(PromoValue);
        let tax = ApplyTax(cost);
        setOrderCost(cost);
        setTaxCost(tax);
        alert(`${PromoValue}% Applied!`);
        PromoApplied = true;
      }
    }
    else{
      alert('Promo already applied!');
    }
    setCouponPopupVisible(false);
  }
    
  //Redirect to home page if the OrderCost is 0
  if(OrderCost === 0 && OrderPlaced){
    return (
      <Navigate to="/"/>
    )
  }
  else{
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
          <div className="checkout-summary-cost">
            <div className='checkout-subTotalcost'>Subtoal <div>{formatCurrency(OrderCost)}</div></div>
            <div className='checkout-taxCost'>Tax <div>{formatCurrency(TaxCost)}</div></div>
            <div className='checkout-totalCost'>Total <div>{formatCurrency(OrderCost + TaxCost)}</div></div>
          </div>
          <form className="checkout-form">
            <div>
              <label htmlFor="checkout-username">Contact Full name</label>
              <input id="checkout-username" type="text" placeholder="Enter your full name" />
              <span className='checkout-username-err error'>Please enter a name for the order</span>
            </div>
            <div>
              <label htmlFor="checkout-useremail">Contact Email address</label>
              <input id="checkout-useremail" type="email" placeholder="Enter contact email" />
              <span className='checkout-useremail-err error'>Please enter a contact email</span>
            </div>
            <div>
              <label htmlFor="checkout-userphone">Contact Phone number</label>
              <input id="checkout-userphone" type="text" placeholder="Enter contact phone" />
              <span className='checkout-userphone-err error'>Please enter a contact phone number</span>
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
  
    
    {pointsSelected && pointsApplied && (
            <div className="overlay">
              <div className="points-modal">
                <button className="close-btn" onClick={() => setPointsSelected(false)}>X</button>
                <p>Points available: {points}</p>
                <p>Total after points: {formatCurrency(OrderCost)}</p>
              </div>
            </div>
  
          )}
        </div>
      </div>
    );
  }

}
//Function to get current date for checkout
function GetCurrentDate(){
  var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
return today;
}
//Apply taxes to the cost
function ApplyTax(cost){
  //Values for calculating tax
  const FedTax = 0.05;
  const ProvTax = 0.08;

  let final = (FedTax * cost) + (ProvTax * cost);
  return parseFloat(final.toFixed(2));
}
//Function to validate validate
function ValidateCreate(AccountInfo){
  let IsContactFormValid = true;

  let phone = $('#checkout-userphone').val();
  let email = $('#checkout-useremail').val();
  let name = $('#checkout-username').val();
  //Validate name
  if(name === "" || name === null || name === undefined){
    IsContactFormValid = false;
    $('.checkout-username-err').removeClass('error');
  }
  else{
    IsContactFormValid = true;
    $('.checkout-username-err').addClass('error');
  }
  //Validate phone
  if(phone === "" || phone === null || phone === undefined){
    IsContactFormValid = false;
    $('.checkout-userphone-err').removeClass('error');
  }
  else{
    if(!validatePhone(phone)){
      IsContactFormValid = false;
      $('.checkout-userphone-err').removeClass('error');
    }
    else{
      IsContactFormValid = true;
      $('.checkout-userphone-err').addClass('error');
    }
  }
  //Validate email
  if(email === "" || email === null || email === undefined){
    IsContactFormValid = false;
    $('.checkout-useremail-err').removeClass('error');
  }
  else{
    if(!ValidateEmail(email)){
      IsContactFormValid = false;
      $('.checkout-useremail-err').removeClass('error');
    }
    else{
      IsContactFormValid = true;
      $('.checkout-useremail-err').addClass('error');
    }
  }
  return IsContactFormValid;
}

export default Checkout;

