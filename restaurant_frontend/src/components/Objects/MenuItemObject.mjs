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
        Get: "https://drumrockjerkapi-v1.azure-api.net/drumrockjerkMenuItem/GetMenuItem",
        GetAll: "https://drumrockjerkapi-v1.azure-api.net/drumrockjerkMenuItem/GetAllMenuItems",
        Delete: "https://drumrockjerkapi-v1.azure-api.net/drumrockjerkMenuItem/RemoveMenuItem",
        Create: "https://drumrockjerkapi-v1.azure-api.net/drumrockjerk/MenuItem/AddMenuItem",
        Update: "https://drumrockjerkapi-v1.azure-api.net/drumrockjerkMenuItem/UpdateMenuItem",
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
            const params = new URLSearchParams();
            params.append("itemId", id);
            await fetch(`${this.#urls["Get"]}?${params}`, {
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
        let formData = new FormData();
        const imageBase64 = Buffer.from(image).toString("base64");
        formData.append('item', JSON.stringify(menuItem));
        formData.append('File', imageBase64);
        try{
            await fetch(this.#urls["Create"], {
                method: "POST",
                body: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            }).then((response)=>{
                if(response.status!=200){
                    console.error(response.statusText);
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
            const params = new URLSearchParams();
            params.append("itemId", id);
            await fetch(`${this.#urls["Update"]}?${params}`, {
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
            const params = new URLSearchParams();
            params.append("itemId", id);
            await fetch(`${this.#urls["Delete"]}?${params}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            }).then((response)=>{
                if(response.status!=200){
                    console.log(response.statusText);
                    return null
                }
                return response.json();
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