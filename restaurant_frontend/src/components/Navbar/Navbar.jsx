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
  //Remove basket items
  document.addEventListener('click', (event)=>{RemoveCartItem(event)})

  return(
    <div>
        <nav className="app__navbar">
        <div className='logo-container'>
            <img id="nav-logo"src={navlogo} alt="Nav Logo" />
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
            <li className='p__opensans hide' id ="home"><NavLink to="/">Home</NavLink></li>
            <li className='p__opensans' id ="menu" ><NavLink to="/Menu">Menu</NavLink></li>
            <li className='p__opensans' id ="location" ><NavLink to='/Location'>Location</NavLink></li>
            <li className='p__opensans' id ="about" ><NavLink to="/About">About Us</NavLink></li>
            <li className='p__opensans' id ="review" ><NavLink to='/Review'>Reviews</NavLink></li>
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
        //then use an if statement to filter them
    if(CurrentPage ===null || CurrentPage.length===1){
      $('#home').addClass('hide');
    }
    else{
      $('#home').removeClass('hide');
      if(CurrentPage.includes('Menu'))
      {
        $('#menu').addClass('hide');
      }
      else if(CurrentPage.includes('Location'))
      {
        $('#location').addClass('hide');
      }
      else if(CurrentPage.includes('Review'))
      {
        $('#review').addClass('hide');
      }
      else if(CurrentPage.includes('About'))
      {
        $('#about').addClass('hide');
      }
      else if(CurrentPage.includes('Account'))
      {
        $('#login').addClass('hide');
      }
      else if(CurrentPage.includes('Checkout')){
        $('#checkout').addClass('hide');
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
  
  
  function Summary({ subTotal, tax, total }) {
    console.log('subtoal',subTotal)
    return (
      <div className="SumContainer">
        <div className="pricesummary">
          <ul className="summaryli">
            <li>
              Subtotal:  <span>{formatCurrency(subTotal)}</span>
            </li>
  
            <li>
              Tax:  <span>{formatCurrency(tax)}</span>
            </li>
            <li className="total">
              Total:  <span>{formatCurrency(total)}</span>
            </li>
          </ul>
        </div>
      <Checkout></Checkout>
      </div>
    );
  }
  

  export function Basket({ cartItems, onChangeProductQuantity, onRemoveProduct }) {
    const [subTotal, setSubTotal] = useState(0);
    const [tax, setTax] = useState(0);
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
  
    useEffect(() => {
      let subtotal = 0;
      if (cartItems) {
        cartItems.forEach((item) => {
          subtotal += item.price * item.quantity;
        });
      }
      setSubTotal(subtotal);
      setTax(subtotal * 0.13);
      setTotal(subtotal + subtotal * 0.13);
    }, [cartItems]);
  
    return (
      <div className="BasketContainer hide-basket" id='basketcontainer'>
        <ProductList
          cartItems={cartItems}
          onChangeProductQuantity={handleProductQuantityChange}
          onRemoveProduct={handleRemoveProduct}
        />
        
        <Summary subTotal={subTotal} tax={tax} total={total} />
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
      if(element.tagName == 'BUTTON' && element.classList.contains("Order-Remove"))
      {
        //Remove the item
        $(element).parent().remove();
      }
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
  