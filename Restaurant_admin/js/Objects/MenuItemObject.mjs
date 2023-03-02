 /*======================================================================
| MenuItemObject
|
| Name: MenuItemObject.js
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
export class MenuItemObject{
    //The items Information
    #MenuItem = null;
    //API urls
    #urls = {
        Get: "http://chigozie107-001-site1.itempurl.com/MenuItem/GetMenuItem",
        GetAll: "http://chigozie107-001-site1.itempurl.com/MenuItem/GetAllMenuItems",
        Delete: "http://chigozie107-001-site1.itempurl.com/MenuItem/RemoveMenuItem",
        Create: "http://chigozie107-001-site1.itempurl.com/MenuItem/AddMenuItem/",
        Update: "http://chigozie107-001-site1.itempurl.com/MenuItem/UpdateMenuItem",
    }
    //Default constructor
    constructor(){
        this.#MenuItem = {
        _id: null,
        Name: null,
        Price: null,
        Menu: null,
        OrderCount: null,
        ImageLink: null,
        }
    }
    //Get all MenuItems
    async GetAllMenuItems(){
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
    async GetMenuItem(id){
        let dataToReturn;
        try{
            await fetch(`${this.#urls["Get"]}/${id}`, {
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
    async AddMenuItem(menuItem, image){
        let dataToReturn;
        let imageBase64 = await this.#convertImageToBase64_Path(image);
        let menuItemModel ={
            item: menuItem,
            file: imageBase64
        }
        try{
            await fetch(this.#urls["Create"], {
                method: "POST",
                body: JSON.stringify(menuItemModel),
                headers: { "Content-Type": "application/json" }
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
    //Update a MenuItem
    async UpdateMenuItem(id, item){
        let dataToReturn;
        try{
            await fetch(`${this.#urls["Update"]}/${id}`, {
                method: "PUT",
                body: JSON.stringify(item),
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
    //Delete A Menu Item
    async DeleteMenuItem(id){
        try{
            await fetch(`${this.#urls["Delete"]}/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
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
    //Convert an image to Base64 using its path
   async #convertImageToBase64_Path(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64 = reader.result.replace(/^data:.+;base64,/, '');
          resolve(base64);
        };
        reader.onerror = reject;
      });
}
}