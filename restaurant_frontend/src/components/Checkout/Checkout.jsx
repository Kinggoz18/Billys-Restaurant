import { useState } from 'react';
import './Checkout.css';

function Checkout() {
  const [points, setPoints] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [price, setPrice] = useState(100); // default price without discount
  const [usePoints, setUsePoints] = useState(false);

  const handleUsePointsChange = (event) => {
    setUsePoints(event.target.checked);
  };

  const handleCouponSubmit = (event) => {
    event.preventDefault();
    if (points >= 50) {
      setPrice(price * 0.8); // apply 20% discount
      setCouponApplied(true);
    }
    setPoints(points + 10); // add 10 points for submitting coupon
  };

  return (
    <div className='Checkout'>
      <div className='basket-summary'>
        <h2>Order Summary</h2>
        <ul className='basket-items'>
          <li>Item 1 - $10</li>
          <li>Item 2 - $20</li>
          <li>Item 3 - $30</li>
        </ul>
        <p>Total: $60</p>
      </div>
      <form className='payment-form'>
        <label className='payment-label'>
          Card Number:
          <input className='payment-input' type="text" name="cardNumber" />
        </label>
        <label className='payment-label'>
          Card Name:
          <input className='payment-input' type="text" name="cardName" />
        </label>
        <label className='payment-label'>
          Card Expiry:
          <input className='payment-input' type="text" name="cardExpiry" />
        </label>
        <label className='payment-label'>
          Card CVC:
          <input className='payment-input' type="text" name="cardCvc" />
        </label>
        <label className='payment-label'>
          Use Points:
          <input className='payment-checkbox' type="checkbox" name="usePoints" checked={usePoints} onChange={handleUsePointsChange} />
        </label>
        <button className='payment-button' type="submit">Pay Now</button>
      </form>
      <form className='coupon-form' onSubmit={handleCouponSubmit}>
        <p>You have {points} points.</p>
        <label className='coupon-label'>
          Enter Coupon Code:
          <input className='coupon-input' type="text" name="couponCode" />
        </label>
        <button className='coupon-button' type="submit">Apply Coupon</button>
        {couponApplied && <p>Coupon applied! New price: ${price}</p>}
      </form>
      <p>Thank you for your order! We will notify you when your order is ready for pickup.</p>
    </div>
  );
}

export default Checkout;
