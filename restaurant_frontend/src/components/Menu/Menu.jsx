import React, { useState, useEffect } from 'react';
import {Loading} from '../LoadingIcon'
import {Link} from 'react-router-dom'
import $ from 'jquery';
//Object Import
import {MenuItem, Menu} from '../Objects/ObjectExports.mjs'
//Logo Imports
import DefaultHeader from '../Images/Headers.mp4'

import './Menu.css';

//Global variables
let  GlobalMenu = new Menu.MenuObject();

let cartItemValues = [];
let CartItems = [];
  
//Menu Navbar component
export function MenuNav(){
  return(
    <div>
      <div>
      <video className='menu-logo' autoPlay>
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
    <nav className='Mobile-MenuNav'>
      <ul className='Mobile-MenuNavlist'>
        <li>All</li>
        <li>Main Dish</li>
        <li>Sides</li>
        <li>Drinks</li>
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
        var item = {
          itemId: element['_id'],
          itemName: element['name'],
          itemPrice: element['price'],
          itemImage: element['imageLink'],
          itemRating: element['orderCount'],
          category: element['menu']
        }
        MenuItemArray.push(item);
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
        var item = {
          itemId: element['_id'],
          itemName: element['name'],
          itemPrice: element['price'],
          itemImage: element['imageLink'],
          itemRating: element['orderCount'],
          category: element['menu']
        }
        MenuItemArray.push(item);
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
        var item = {
          itemId: element['_id'],
          itemName: element['name'],
          itemPrice: element['price'],
          itemImage: element['imageLink'],
          itemRating: element['orderCount'],
          category: element['menu']
        }
        MenuItemArray.push(item);
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
        var item = {
          itemId: element['_id'],
          itemName: element['name'],
          itemPrice: element['price'],
          itemImage: element['imageLink'],
          itemRating: element['orderCount'],
          category: element['menu']
        }
        MenuItemArray.push(item);
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
  let current =`  <li class="cartItem" id='${ElementId}'>
  <div class='Order-ItemId hide'>${id}</div>
  <div class="Order-ItemName">${name}</div>
  <div class='Order-ItemPrice'>${price}</div>
  <input class='Order-Count' id='CartItem-Count${id}' type="number" min="0" value=1 />
  <button class='Order-Remove'>Remove</button>
  </li>`


  let cart = document.querySelector('#Users-Cart');
  let cartText = cart.innerHTML;
  let queryId  = `#CartItem-Count${id}`;

  if(FindItemInList(cartText, id) === false){
    //add the item to the global array
    let currItem = {id: queryId, value: 1};
    cartItemValues.push(currItem);
    //Update the html
    cart.innerHTML+= current;
    SetCartItemValues()
  }
  else{
      let item = document.querySelector(queryId);
      let number = parseInt(item.value) + 1;
      item.value = number;
      //Update the item
      let currItem = {id: queryId, value: number};
      cartItemValues.push(currItem);
  }
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

//Function to set the cart item values 
function SetCartItemValues(){
  cartItemValues.forEach(element=>{
    $(element.id).val(element.value);
  })
}