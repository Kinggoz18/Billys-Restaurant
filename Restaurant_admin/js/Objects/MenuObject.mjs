 /*======================================================================
| MenuObject
|
| Name: MenuObject.js
|
| Written by: Chigozie Muonagolu - Febuary 2023
|
| Purpose: Communicate with the backend/API.
|
| usage: used in services that requires it.
|
| Description of properties: None
|
|------------------------------------------------------------------
*/
export class MenuObject{
     //The items Information
     #MenuItem = null;
     //API urls
     #urls = {
        Get: "http://chigozie107-001-site1.itempurl.com/Menu/GetMenu/",
        GetAll: "http://chigozie107-001-site1.itempurl.com/Menu/GetAllMenu",
        Delete: "http://chigozie107-001-site1.itempurl.com/Menu/DeleteMenu",
        Create: "http://chigozie107-001-site1.itempurl.com/Menu/AddMenu",
        Update: "http://chigozie107-001-site1.itempurl.com/Menu/UpdateMenu",
     }
     //Default constructor
     constructor(){
         this.#MenuItem = {
         _id: null,
         Name: null,
         FoodList: []
         }
     }
     //Get all MenuItems
     async GetAllMenu(){
         let dataToReturn;
         try{
             await fetch(this.#urls["GetAll"], {
                 method: "GET",
                 headers: { "Content-Type": "application/json" }
             }).then((response)=>{
                 if(response.status!=200){
                     console.log(response.statusText);
                     return null
                 }
                 return response.json();
             }).then((data)=>{
                 if (data == null) {
                     return false;
                 } else if (data.emailAddress === "string" && data.password === "string") {
                     return false;
                 }
                 dataToReturn = data;
             })
         }
         catch(error){
             console.log(error);
             return null;
         }
         return dataToReturn;
     }
     //Get a menu item
     async GetMenu(menuName){
         let dataToReturn;
         try{
             await fetch(`${this.#urls["Get"]}/${menuName}`, {
                 method: "GET",
                 headers: { "Content-Type": "application/json" }
             }).then((response)=>{
                 if(response.status!=200){
                     console.log(response.statusText);
                     return null
                 }
                 return response.json();
             }).then((data)=>{
                 if (data == null) {
                     return false;
                 } else if (data.emailAddress === "string" && data.password === "string") {
                     return false;
                 }
                 dataToReturn = data;
             })
         }
         catch(error){
             console.log(error);
             return null;
         }
         this.#MenuItem = dataToReturn;
     }
     //Create MenuItem
     async AddMenu(menuName){
         let dataToReturn;
         try{
            const params = new URLSearchParams();
            params.append("MenuName", menuName);
             await fetch(`${this.#urls["Create"]}?${params}`, {
                 method: "POST",
             }).then((response)=>{
                 if(response.status!=200){
                     response.text().then(text=>{
                         throw new Error(text);
                     })
                     return null
                 }
                 return response.json();
             }).then((data)=>{
                 if (data == null) {
                     return false;
                 } else if (data.emailAddress === "string" && data.password === "string") {
                     return false;
                 }
                 dataToReturn = data;
             })
         }
         catch(error){
             console.log(error);
             return null;
         }
         this.#MenuItem = dataToReturn;
     }
     //Delete A Menu Item
     async DeleteMenu(name){
         try{

             await fetch(`${this.#urls["Delete"]}/${name}`, {
                 method: "DELETE",
             }).then((response)=>{
                 if(response.status!=200){
                     console.log(response.statusText);
                     return null
                 }
                 return true;
             }).then(()=>{
                 this.#MenuItem = null;
             });
         }
         catch(error){
             console.log(error);
             return null;
         }
     }
      
     get ReturnItemData(){
         return this.#MenuItem;
     }
}