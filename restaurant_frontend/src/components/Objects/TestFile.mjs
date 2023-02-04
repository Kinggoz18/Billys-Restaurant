import fs from 'fs'
import { MenuItemObject } from "./MenuItemObject.mjs";

let Mains = ["Chicken and Peas", "Chicken and Rice", "Chicken and salad", "Jerk Meal", "BBQ Meal"];
let Sides = ["BBQ Chicken", "Jerk Chicken", "Fish", "Cookies", "Brownies"];
let Drinks = ["Coca Cola", "Orange Juice", "Apple Juice", "Sprite", "Fanta", "Energy Drink"];
let menuItemsArray = [];
let menuItem = new MenuItemObject();
const imagePath = '/Users/chigoziemuonagolu/Desktop/Billys-Restaurant/restaurant_frontend/src/components/Images/food1.jpg'; 

generateMenuItems();
let imageFile;

await fs.promises.readFile(imagePath)
  .then(data => {
    imageFile = data;
    menuItemsArray.forEach(async Element=>{
        await menuItem.AddMenuItem(Element, imageFile);
        let data = JSON.stringify(menuItem.ReturnItemData);
        console.log(data);
    });
  })
  .catch(error => {
    console.error(error);
  });


function generateMenuItems(){

    Mains.forEach(Element=>{
        let temp = {
            _id: null,
            Name: Element,
            Price: 12.50,
            Menu: "Mains",
            OrderCount: null,
            ImageLink: null,
        }
        menuItemsArray.push(temp);
    })
    Sides.forEach(Element=>{
        let temp = {
            _id: null,
            Name: Element,
            Price: 7.80,
            Menu: "Sides",
            OrderCount: null,
            ImageLink: null,
        }
        menuItemsArray.push(temp);
    })
    Drinks.forEach(Element=>{
        let temp = {
            _id: null,
            Name: Element,
            Price: 3.50,
            Menu: "Drinks",
            OrderCount: null,
            ImageLink: null,
        }
        menuItemsArray.push(temp);
    })
}