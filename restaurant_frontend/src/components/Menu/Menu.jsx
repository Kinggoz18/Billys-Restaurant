import React, { useState, useEffect } from 'react';
import {Loading} from '../LoadingIcon'
import {Link} from 'react-router-dom'
//Object Import
import {MenuItem} from '../Objects/ObjectExports.mjs'
//Logo Imports
import DefaultHeader from '../Images/Headers.mp4'

import './Menu.css';

//Global variables
let  GlobalMenu = new MenuItem.MenuItemObject()
let MenuItemArray = []
let items = [];
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
  </div>
  );
}

//Component to send add food item to users cart
function AddToBasket(props){
  return(
    <div>
      <button className='AddToBasket'>Add to cart</button>
    </div>
  );
}

//Temlpate for menu items
function MenuItemComponent(props){
  return(
    <div className='MenuItem'>
      <img src={props.image} alt={props.name}></img>
      <p>{props.name}</p>
      <p>{props.price}</p>
      < AddToBasket/>
    </div>
  );
}

//Main menu component
export function DrinkMenu(){
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
export function SideMenu(props){
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
//Function load a specific menu
async function loadAllMenuItem(){
  //If item has not been defined
  if(items.length === 0){
    await GlobalMenu.GetAllMenuItems().then((data)=>{
      data.forEach(element=>{
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
      MenuItemArray.forEach((element, index) => {
        let current = <MenuItemComponent key={index} image={element['itemImage']} name={element['itemName']} price={element['itemPrice']} />
        items.push(current);
      });
    })
  }
  return items;
}
