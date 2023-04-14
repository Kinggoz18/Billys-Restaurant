//Function to from local storage
 function GetFromStorage(Name){
    return localStorage.getItem(Name);
  }
  //Function to find if an item exists
   function IsInStorage(Name) {
    const item = localStorage.getItem(Name);
    if(item!==null && item!==undefined)
      return true;
    else
      return false;
  }
  
  //Function to Delete from local storage
   function RemoveFromStorage(Name){
    localStorage.removeItem(Name);
  }
  //Function to add to local storage
   function AddToStorage(Name, value){
    localStorage.setItem(Name, value);
  }