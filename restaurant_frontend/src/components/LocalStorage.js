//Function to from local storage
export function GetFromStorage(Name){
  return localStorage.getItem(Name);
}
//Function to find if an item exists
export function IsInStorage(Name) {
  const item = localStorage.getItem(Name);
  if(item!==null && item!==undefined)
    return true;
  else
    return false;
}

//Function to Delete from local storage
export function RemoveFromStorage(Name){
  localStorage.removeItem(Name);
}
//Function to add to local storage
export function AddToStorage(Name, value){
  localStorage.setItem(Name, value);
}