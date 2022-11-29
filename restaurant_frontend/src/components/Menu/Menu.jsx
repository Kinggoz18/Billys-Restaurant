import React from 'react';
import DrumRockJerk from '../Images/logo.png'
import foodItem1 from '../Images/food1.jpg';
import foodItem2 from '../Images/food2.jpg';

import './Menu.css';
let MenuItems = {
  items:[
    {itemName: "Famous Jerk Chicken", itemPrice: "$15.50", itemImage: foodItem1, category: 'Meal'},
    {itemName: "Famous BBQ Chicken", itemPrice: "$10.50", itemImage: foodItem1, category: 'Meal'},
    {itemName: "Famous Rice & Chicken", itemPrice: "$15.50", itemImage: foodItem2, category: 'Meal'},
    {itemName: "Famous Beans & Chicken", itemPrice: "$12.50", itemImage: foodItem2, category: 'Meal'},
    {itemName: "Famous BBQ Chicken", itemPrice: "$10.50", itemImage: foodItem1, category: 'Meal'},
    {itemName: "Famous Jerk Chicken", itemPrice: "$15.50", itemImage: foodItem1, category: 'Meal'},
  ]
}

//Menu Navbar component
function MenuNav(props){
  return(
    <div>
      <div>
        <img className='menu-logo' src={DrumRockJerk} alt='Drum Rock Jerk Logo'/>
      </div>
      <nav className='Desktop-MenuNav'>
      <ul className='Desktop-MenuNavlist'>
        <li>All</li>
        <li>Main Dish</li>
        <li>Sides</li>
        <li>Drinks</li>
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

//Function to send add food item to users cart
function AddToBasket(props){
  return(
    <div>
      <button className='AddToBasket'>Add to cart</button>
    </div>
  );
}

//Temlpate for menu items
function MenuItem(props){
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
class Menu extends React.Component{
  constructor(props){
    super(props);
    this.state={
      anystate: null, //change later
    }

  }
  LoadMenuItems(){
    //Make an API call to fecth all menu items in Index.js and store them in an Object
    //Pass the array through the prop
    //Change test implementation
    let items = [];
    let id =0;
    MenuItems['items'].forEach(element => {
      id+=1;
      let current = <MenuItem image={element['itemImage']} name={element['itemName']} price={element['itemPrice']} key={id}/>
      items.push(current);
    });
    return items;
  }
  render(){
    return(
      <div className='MenuPage'>
        <MenuNav></MenuNav>
        <div className='Menu'>
        {
          this.LoadMenuItems()
        }
        </div>
      </div>
    )
  }
}

export default Menu;
