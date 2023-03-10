import React, { useState } from 'react';
import Modal from 'react-modal';
import './Order.css';

Modal.setAppElement('#root');


export function OrderComponent() {
    const [orderCount, setOrderCount] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [subtotal, setSubtotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [total, setTotal] = useState(0);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div className='cartmodal' >
        <i onClick={openModal} className="fa fa-shopping-cart"></i>
      <Modal className={"usercart"} isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2 id='Carttitle'>Your Cart</h2>
        <p>You have {orderCount} items in your cart.</p>
        <ul id='Users-Cart'>
          {/* Display the items in the cart here */}
        </ul>
        <button className='checkoutbtn' onClick={closeModal}>Checkout</button>
      </Modal>
    </div>
  );
}


