import React, { useState, useEffect } from 'react';
import {Loading} from '../LoadingIcon'
import {Link} from 'react-router-dom'
import $ from 'jquery';
//Object Import
import {MenuItem, Menu} from '../Objects/ObjectExports.mjs'
import { formatCurrency } from '../Navbar/Navbar';

//Logo Imports
import DefaultHeader from '../Images/Headers.mp4'

import './Menu.css';


//Global variables
let  GlobalMenu = new Menu.MenuObject();

export let cartItemValues = [];
export let CartTotalCost = [];
let CartItems = [];

// Global Event listeners

// Add an event listener to the document object for input change events
document.addEventListener('input', (event) => {
  // Check if the event was triggered by an input element with the Order-Count class
  if (event.target.classList.contains('Order-Count')) {
    var element = event.target;
    let idToRemove = $(element).prev().prev().prev().text().replace(/ /g, "");
    let price = $(element).prev().text();
    let cost = parseFloat(price.substring(1, price.length))
    let value = event.target.value; // update the value in currItem
    SetCartItemValues(); // update the outer HTML
    UpdateCartItemValue( `#CartItem-Count${idToRemove}`, value)
    UpdateItemToCart(idToRemove, cost, value); //Updatet the global array holding the total cost
  }
});

//Menu Navbar component
export function MenuNav(){
  return(
    <div className='menunav-div'>
      <div>
      <video className='menu-logo' autoPlay muted playsInline controls={false}>
        <source src={DefaultHeader} type="video/mp4"/>
      </video>
      </div>
      <nav className='Desktop-MenuNav'>
      <ul className='Desktop-MenuNavlist'>
        <li><Link to='/Menu'>All</Link></li>
        <li><Link to='/Menu/Main'>Main Dish</Link></li>
        <li><Link to='/Menu/Sides'>Sides</Link></li>
        <li><Link to='/Menu/Drinks'>Drinks</Link></li>
      </ul>
    </nav>
    <span className='Menu-Subtitle'>Choose from a variety of savory and satisfying menu options.</span>
  </div>
  );
}
//Component to send add food item to users cart
function AddToBasket(props){
  return(
    <div>
      <button onClick={(event)=>AddToCart(event)} className='AddToBasket'>Add to cart</button>
    </div>
  );
}

//Temlpate for menu items
function MenuItemComponent(props){
  return(
    <div className='MenuItem'>
      <img src={props.image} alt={props.name}></img>
      <span className='hide'>{props.id}</span>
      <span>{props.name}</span>
      <span>{props.price}</span>
      < AddToBasket/>
    </div>
  );
}

//Main menu component
export function DrinkMenu(){
  const [menuItems, setMenuItems] = useState(null);

  useEffect(() => {
    LoadDrinks().then((data) => {
      setMenuItems(data);
    });
  }, []);

  if (!menuItems) {
    return <Loading/>;
  }
  return (
    <div className='Menu'>
      {menuItems}
    </div>
  );
}

//Main menu component
export function AllMenu(props){
  const [menuItems, setMenuItems] = useState(null);

  useEffect(() => {
    loadAllMenuItem().then((data) => {
      setMenuItems(data);
    });
  }, []);

  if (!menuItems) {
    return <Loading/>;
  }
  return (
    <div className='Menu'>
      
      {menuItems} 
    </div>
  );
}
//Main menu component
export function MainMenu(){
  const [menuItems, setMenuItems] = useState(null);

  useEffect(() => {
    LoadMain().then((data) => {
      setMenuItems(data);
    });
  }, []);

  if (!menuItems) {
    return <Loading/>;
  }
  return (
    <div className='Menu'>
      {menuItems}
    </div>
  );
}
//Main menu component
export function SideMenu(props){
  const [menuItems, setMenuItems] = useState(null);

  useEffect(() => {
    LoadSides().then((data) => {
      setMenuItems(data);
    });
  }, []);

  if (!menuItems) {
    return <Loading/>;
  }
  return (
    <div className='Menu'>
      {menuItems}
    </div>
  );
}
//Function load all the menus
async function loadAllMenuItem(){
  let items = [];
  let MenuItemArray = []
    await GlobalMenu.GetAllMenu().then((data)=>{
      data.forEach((element)=>{
        let menu = element['foodList'];
        menu.forEach(element=>{
        if(element!==null){
          var item = {
            itemId: element['_id'],
            itemName: element['name'],
            itemPrice: `$${element['price'].toFixed(2)}`,
            itemImage: element['imageLink'],
            itemRating: element['orderCount'],
            category: element['menu']
          }
          MenuItemArray.push(item);
        }
       })
      });
      MenuItemArray.forEach((element) => {
        let current = <MenuItemComponent key={element['itemId']} id={element['itemId']} image={element['itemImage']} name={element['itemName']} price={element['itemPrice']} />
        items.push(current);
      });
    })
  return items;
}

//Function to load all  drinks
async function LoadDrinks(){
  let items = [];
  let MenuItemArray = []
    await GlobalMenu.GetAllMenu().then((data)=>{
      let DrinksMenu = data.find(element => element['name'] === 'Drinks');
      DrinksMenu['foodList'].forEach((element)=>{
       if(element!==null){
        var item = {
          itemId: element['_id'],
          itemName: element['name'],
          itemPrice: `$${element['price'].toFixed(2)}`,
          itemImage: element['imageLink'],
          itemRating: element['orderCount'],
          category: element['menu']
        }
        MenuItemArray.push(item);
       }
      });
      MenuItemArray.forEach((element) => {
        let current = <MenuItemComponent key={element['itemId']} id={element['itemId']} image={element['itemImage']} name={element['itemName']} price={element['itemPrice']} />
        items.push(current);
      });
    })
  return items;
}

//Function to load all sides
async function LoadSides(){
  let items = [];
  let MenuItemArray = []
    await GlobalMenu.GetAllMenu().then((data)=>{
      let SidesMenu = data.find(element => element['name'] === 'Sides');
      SidesMenu['foodList'].forEach((element)=>{
       if(element!==null){
        var item = {
          itemId: element['_id'],
          itemName: element['name'],
          itemPrice: `$${element['price'].toFixed(2)}`,
          itemImage: element['imageLink'],
          itemRating: element['orderCount'],
          category: element['menu']
        }
        MenuItemArray.push(item);
       }
      });
      MenuItemArray.forEach((element) => {
        let current = <MenuItemComponent key={element['itemId']} id={element['itemId']} image={element['itemImage']} name={element['itemName']} price={element['itemPrice']} />
        items.push(current);
      });
    })
  return items;
}

//Function to load all main meals
async function LoadMain(){
  let items = [];
  let MenuItemArray = []
    await GlobalMenu.GetAllMenu().then((data)=>{
      let MainMenu = data.find(element => element['name'] === 'Main');
      MainMenu['foodList'].forEach((element)=>{
        if(element!=null){
          var item = {
            itemId: element['_id'],
            itemName: element['name'],
            itemPrice: `$${element['price'].toFixed(2)}`,
            itemImage: element['imageLink'],
            itemRating: element['orderCount'],
            category: element['menu']
          }
          MenuItemArray.push(item);
        }
      });
      MenuItemArray.forEach((element) => {
        let current = <MenuItemComponent key={element['itemId']} id={element['itemId']} image={element['itemImage']} name={element['itemName']} price={element['itemPrice']} />
        items.push(current);
      });
    })
  return items;
}

//Function to add the menu Item to cart
function AddToCart(event){

  let price = $(event.target).parent().prev().text();
  let name = $(event.target).parent().prev().prev().text();
  let id =  $(event.target).parent().prev().prev().prev().text();
  let ElementId = `CartItem-${id}`;

  //Build the item 
  let current =`  <li class="cartItem" id='${ElementId}'>
  <div class='Order-ItemId hide'> ${id} </div>
  <div class="Order-ItemName"> ${name} </div>
  <div class='Order-ItemPrice'>${price}</div>
  <input class='Order-Count' id='CartItem-Count${id}' type="number" min="0" value=1 />
  <button class='Order-Remove' onClick = 'RemoveCartItem(event)'>Remove</button>
  </li>`

  let cart = document.querySelector('#Users-Cart');
  let cartText = cart.innerHTML;
  let queryId  = `#CartItem-Count${id}`;
  let value = 0;
  //Create an object to hold the cost and push it to the global CartTotalCost array
  let cost = parseFloat(price.substring(1, price.length))

  //If the item is in the list
  if(FindItemInList(cartText, id) === false){
    value = 1;
    //add the item to the global array
    let currItem = {id: queryId, value: 1};
    cartItemValues.push(currItem);
    //Update the html
    cart.innerHTML+= current;
    SetCartItemValues();
  }
  else{
    let item = document.querySelector(queryId);
    let number = parseInt(item.value) + 1;
    item.value = number;
    value = number;
    //Update the item
    let currItem = {id: queryId, value: number, cost: cost};
    cartItemValues.push(currItem);
  }
  UpdateItemToCart(id, cost, value); //Updatet the global array holding the total cost
}

//Function to check if an item already exists in the cart
function FindItemInList(text, id){
  if(text.search(id)===-1){
    return false;
  }
  else{
    return true;
  }
}
//Functiont to recalculate basket total
export function CalculateTotalCost(discount){
  let total = 0;
  CartTotalCost.forEach(x=>{
    total+=(x.cost * parseInt(x.count));
  })
  //applyy discount
  if(discount!== null && discount!== undefined){
    total = total - (((discount)/100) * total)
  }
  return parseFloat(total.toFixed(2));
}
//Helper function to add to global array
function UpdateItemToCart(id, cost, value) {
  // Check if the item is already in the cart
  const existingItem = CartTotalCost.find(item => item.id === id);

  if (existingItem) {
    // If the item is already in the cart, update its count property
    existingItem.count = value;
  } else {
    // If the item is not in the cart, push a new object with the given id, cost, and count of 1
    CartTotalCost.push({ id: id, cost: cost, count: value});
  }
  //Update the total cost
  let total = formatCurrency(CalculateTotalCost());
  $('#basket-total').text(total);
}
//Function to set the cart item values 
function SetCartItemValues(){
  cartItemValues.forEach(element=>{
    $(element.id).attr('value', element.value);
  })
}
//Function to update a cart item value 
function UpdateCartItemValue(id, value)
{
  const existingItem = cartItemValues.find(item => item.id === id);
  existingItem.value=value;
}

//Functiont to remove Cart item
window.RemoveCartItem = function(event){
    var element = event.target;
    let idToRemove = $(element).prev().prev().prev().prev().text().replace(/ /g, "");
    //Remove the element
      if(element.tagName === 'BUTTON' && element.classList.contains("Order-Remove"))
      {
        //Remove the item
        $(element).parent().remove();
      }
    //Update the total cost
    CartTotalCost = CartTotalCost.filter(item => item.id !== idToRemove);
    let total = formatCurrency(CalculateTotalCost());
    $('#basket-total').text(total);
}