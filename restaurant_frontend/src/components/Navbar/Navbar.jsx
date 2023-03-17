// cart card/module written by tobi and chigozie 
// tobi worked on the design of the  cart card 
// 
// 
// 
import React,{useState,useEffect} from 'react';
import $, { data } from 'jquery'
import './Navbar.css';
import navlogo from '../Images/DRM.png'
import {AddToStorage} from '../LocalStorage'
import { NavLink, Link, Navigate } from 'react-router-dom';
import {GetCurrentPage} from '../../rootLayout'

let checkoutList = document.querySelector('#Users-Cart');
let checkoutItem = $(checkoutList).children();
let checkoutData = [];


/*Navbar component */
export default function Navbar(props){
  function openbasket(){
    const basket = document.getElementById("basketcontainer");
    if (basket.classList.contains("hide-basket")) {
      basket.classList.remove("hide-basket");
    } else {
      basket.classList.add('hide-basket');
    }

  }


  LoadDynamicNavbar();
  //Global variables
  let isMobileToggled = false;
  //Global event listeners

  //Toggle mobile nav
  $('.fas.fa-bars').on('click', ()=>{
    if(!isMobileToggled){
      $('.mobile-navbar').addClass('show-mobileNav show-mobileNavList');
      isMobileToggled = true;
    }
    else{
      $('.mobile-navbar').removeClass('show-mobileNav');
      isMobileToggled = false;
    }
  })
  //Remove basket items
  document.addEventListener('click', (event)=>{RemoveCartItem(event)})

  return(
    <div>
        <nav className="app__navbar">
        <div className='logo-container'>
          <img id="nav-logo"src={navlogo} alt="Nav Logo" />
          <div className='mobile_app__navbar-right'>
              <span className='moblie-menu'><i className="fas fa-bars"></i></span>
          </div>
        </div>
          <ul className='app__navbar-links'>
            <li className='p__opensans hide' id ="home"><NavLink to="/">Home</NavLink></li>
            <li className='p__opensans' id ="menu" ><NavLink to="/Menu">Menu</NavLink></li>
            <li className='p__opensans' id ="location" ><NavLink to='/Location'>Location</NavLink></li>
            <li className='p__opensans' id ="about" ><NavLink to="/About">About Us</NavLink></li>
            <li className='p__opensans' id ="review" ><NavLink to='/Review'>Reviews</NavLink></li>
          </ul>
    <div className='app__navbar-right'>
        <span className='moblie-menu'><i className="fas fa-bars"></i></span>
        <p id="login"  className='p__opensans'><NavLink to='/Login'><i className="fa fa-fw fa-user"></i><span className='logni-link'>Start Earning Points Now!</span></NavLink></p>
        <div id="cart"  className='p__opensans'><i onClick={openbasket} className="fa fa-shopping-cart"></i>  </div>
      </div>
      <ul className='mobile-navbar'>
            <li><p id="mobile-login"  className='p__opensans'><NavLink to='/Login'><i className="fa fa-fw fa-user"></i><span className='logni-link'>Login & Start Earning Points Now!</span></NavLink></p></li>
            <li className='p__opensans hide' id ="mobile-home"><NavLink to="/">Home</NavLink></li>
            <li className='p__opensans' id ="mobile-menu" ><NavLink to="/Menu">Menu</NavLink></li>
            <li className='p__opensans' id ="mobile-location" ><NavLink to='/Location'>Location</NavLink></li>
            <li className='p__opensans' id ="mobile-about" ><NavLink to="/About">About Us</NavLink></li>
            <li className='p__opensans' id ="mobile-review" ><NavLink to='/Review'>Reviews</NavLink></li>
            <li><div id="mobile-cart"  className='p__opensans'><i onClick={openbasket} className="fa fa-shopping-cart"></i></div></li>
          </ul>
        </nav>
       <Basket className='Basket'/>
    </div>
  );
};

async function LoadDynamicNavbar(){
  const currentPage = GetCurrentPage();
  let CurrentPage = (currentPage===null)? null : currentPage.pathname;
    //Display every nav item
    $('#home').removeClass('hide');
    $('#menu').removeClass('hide');
    $('#location').removeClass('hide');
    $('#review').removeClass('hide');
    $('#about').removeClass('hide');
    $('#login').removeClass('hide');
    $('#basketcontainer').removeClass('hide');

    //Mobile
    $('#mobile-home').removeClass('hide');
    $('#mobile-menu').removeClass('hide');
    $('#mobile-location').removeClass('hide');
    $('#mobile-review').removeClass('hide');
    $('#mobile-about').removeClass('hide');
    $('#mobile-login').removeClass('hide');
    $('#mobile-basketcontainer').removeClass('hide');

        //then use an if statement to filter them
    if(CurrentPage ===null || CurrentPage.length===1){
      $('#home').addClass('hide');
      $('#mobile-home').addClass('hide');
    }
    else{
      $('#home').removeClass('hide');
      $('#mobile-home').removeClass('hide');
      if(CurrentPage.includes('Menu'))
      {
        $('#menu').addClass('hide');
        $('#mobile-menu').addClass('hide');
      }
      else if(CurrentPage.includes('Location'))
      {
        $('#location').addClass('hide');
        $('#mobile-location').addClass('hide');
      }
      else if(CurrentPage.includes('Review'))
      {
        $('#review').addClass('hide');
        $('#mobile-review').addClass('hide');
      }
      else if(CurrentPage.includes('About'))
      {
        $('#about').addClass('hide');
        $('#mobile-about').addClass('hide');
      }
      else if(CurrentPage.includes('Account') || CurrentPage.includes('Login'))
      {
        $('#login').addClass('hide');
        $('#mobile-login').addClass('hide');
      }
      else if(CurrentPage.includes('checkout')){
        $('#checkout').addClass('hide');
        $('#mobile-basketcontainer').addClass('hide');

        $('#checkout').addClass('hide');
        $('#mobile-basketcontainer').addClass('hide');
      }
    }
  
  }

  // ProductList component renders a list of products with their names, prices, quantity input fields, and remove buttons, and calls corresponding functions when the quantity or remove buttons are clicked.
  export function ProductList({ cartItems, onChangeProductQuantity, onRemoveProduct }) {
    return (
      <ul id="Users-Cart">
        {cartItems &&
          cartItems.map((item, index) => (
            <div className="cartItemCard" key={index}>
              <li className="cartItem">
                <div className="Order-ItemName">{item.name}</div>
                <div className="Order-ItemPrice">{item.price}</div>
                <input
                  className="Order-Count"
                  type="number"
                  min="0"
                  value={item.quantity} 
                  onChange={(event) => onChangeProductQuantity(index, event)}
                />
                <button
                  className="Order-Remove"
                  onClick={() => onRemoveProduct(index)}
                >
                  Remove
                </button>
              </li>  
            </div>
          ))} 
      </ul>
    );
  }
  function Checkout(event){
    let checkoutList = document.querySelector('#Users-Cart');
    let checkoutItem = $(checkoutList).children();
  
    let checkoutData = [];
    $(checkoutItem).each((index, element) => {
      let children = $(element).children();
      let data = {
        name: children[1].innerText,
        price: children[2].innerText,
        count: children[3].value,
      }
      checkoutData.push(data);
    });
    AddToStorage('Checkoutdata', JSON.stringify(checkoutData)); // save as array of objects
    return (
      <Link className="checkoutbtn" to='/checkout'>Check Out</Link>
    );
  }
  

  
  function calculateSubtotal(checkoutData) {
    
    
    let subtotal = 0;
  
    checkoutData.forEach((item) => {
      const price = parseFloat(item.price.replace('$', ''));
      const count = parseInt(item.count);
  
      subtotal += price * count;
      console.log("sub",subtotal);
    });
  
    console.log(subtotal);
    return subtotal;
  }
  
  


function Summary({ total }) {
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const checkoutData = JSON.parse(localStorage.getItem('Checkoutdata'));
    const subtotal = calculateSubtotal(checkoutData);
    setSubtotal(subtotal);
  }, []);

  return (
    <div className="SumContainer">
      <div className="pricesummary">
        <ul className="summaryli">
          <li className="total">
            Total:  <span>{formatCurrency(total)}</span>
          </li>
          <li className="subtotal">
            Subtotal: <span>{formatCurrency(subtotal)}</span>
          </li>
        </ul>
      </div>
      <Checkout checkoutData={checkoutData} onCheckout={() => alert('you have checked out ')} />
    </div>
  );
} 
  

  export function Basket({ cartItems, onChangeProductQuantity, onRemoveProduct }) {
    
    const [total, setTotal] = useState(0);
  
    function handleProductQuantityChange(index, event) {
      if (!event) {
        return;
      }
  
      const newCartItems = [...cartItems];
      newCartItems[index].quantity = parseInt(event.target.value);
      onChangeProductQuantity(index, event); // call the function with the updated quantity value
    }
  
    function handleRemoveProduct(index) {
      const newCartItems = [...cartItems];
      newCartItems.splice(index, 0);
      onRemoveProduct(newCartItems); // call the function with the new cart items
    }
  
    
  
    return (
      <div className="BasketContainer hide-basket" id='basketcontainer'>
        <ProductList
          cartItems={cartItems}
          onChangeProductQuantity={handleProductQuantityChange}
          onRemoveProduct={handleRemoveProduct}
        />
        
        <Summary total={total} />
      </div>
    );
  }
  
  function formatCurrency(value) {
    return Number(value).toLocaleString("en-US", {
      style: "currency",
      currency: "CAD"
    });
  }
  
  //Functiont to remove Cart item
  function RemoveCartItem(event){
    var element = event.target;
      if(element.tagName === 'BUTTON' && element.classList.contains("Order-Remove"))
      {
        //Remove the item
        $(element).parent().remove();
      }
  }

  