//Components imports
import { Home, Menu, Location, Review, AboutUs, CustomerAcc, Checkout } from './components/index';
import { Login } from './components/Accounts/Login';

//React imports
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async';
import React from 'react';
import ReactDOM from 'react-dom/client';

//CSS and JQuery imports
import './index.css';

//layout import
import {RootLayout} from './rootLayout';
import {CustomerLayout} from './components/Layouts/CustomerLayout'
import { MenuLayout } from './components/Layouts/MenuLayout';


const App = () =>  {
  return (
        <RouterProvider router={router}/>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home/>}/>
      <Route path='Menu' element={<MenuLayout/>}>
        <Route index element={<Menu.AllMenu/>}/>
        <Route path='Main' element={<Menu.MainMenu/>}/>
        <Route path='Sides' element={<Menu.SideMenu/>}/>
        <Route path='Drinks' element={<Menu.DrinkMenu/>}/>
      </Route>
      <Route path='Location' element={<Location/>}/>
      <Route path='About' element={<AboutUs/>}/>
      <Route path='Review' element={<Review/>}/>
      <Route path='Login' element={<Login />} />
      <Route path='Checkout' element ={<Checkout/>}/>

      <Route path='Account' element={<CustomerLayout/>}>
        <Route index element={<CustomerAcc.AccountInformation/>}/>
        <Route path='PastOrders' element={<CustomerAcc.PastOrders/>}/>
    </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);



