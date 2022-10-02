//Routing functions imported from controller
import {AdminLogin,
AddFoodItem,
AuthenticateUser,
DeleteAllFood,
UpdateFoodItem,
DeleteFoodItem,
LoadMenu,
CreateOrder,
GetOrder,
GetAllOrders,
DeleteOrder} from '../controller/controller'

const route = (app) =>{
    //Route for Authenticating Admins and owner of the store
    app.route('/AdminLogin')
    .get(AdminLogin);

/**************Routes for Admin Functions***********************/
    //General food list
    app.route('/Admin/FoodItem')
    //Adds a new food item to the DB
    .put(AuthenticateUser, AddFoodItem)
    //Deletes all the food items in the DB
    .delete(AuthenticateUser, DeleteAllFood);

    //Specific Food Items
    app.route('/Admin/FoodItem/:FoodName')
    //Update Food Item, can also be used for adding discounts
    .put(AuthenticateUser, UpdateFoodItem)
    //Delete a food item
    .delete(AuthenticateUser, DeleteFoodItem);

    //Admin Functions for orders
    app.route('/Admin/Orders')
    //Gets All Orders
    .get(AuthenticateUser, GetAllOrders);
    
/****************** Routes General Functions & Patreon Functions *************/
    //Returns details of a specific order
    app.route('/Orders')
    //Creates a new order
    .put(CreateOrder);

    app.route('/Orders/:OrderId')
    //Deletes a Specific Order - sends an email to the owner and removes the order from db
    .delete(AuthenticateUser, DeleteOrder)
    //Gets a Specific Order
    .get(GetOrder);
    app.route('/Menu/:MenuName')    
    //Returns all the food in the DB
    .get(LoadMenu);

}

export default route;