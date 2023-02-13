//Components imports
import { Home, Menu, Location, ContactUs, AboutUs, CustomerAcc } from './components/index';
import { Login } from './components/Accounts/Login';

//React imports
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import React from 'react';
import ReactDOM from 'react-dom/client';

//CSS and JQuery imports
import './index.css';

//layout import
import {RootLayout} from './rootLayout';
import {CustomerLayout} from './components/Layouts/CustomerLayout'


const App = () =>  {
  return (
      <div>
        <RouterProvider router={router}/>
      </div>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
      <Route index element={<Home/>}/>
      <Route path='Menu' element={<Menu/>}/>
      <Route path='Location' element={<Location/>}/>
      <Route path='About' element={<AboutUs/>}/>
      <Route path='Contact' element={<ContactUs/>}/>
      <Route path='Login' element={<Login />} />

      <Route path='Account' element={<CustomerLayout/>}>
        <Route index element={<CustomerAcc.AccountInformation/>}/>
        <Route path='PastOrders' element={<CustomerAcc.PastOrders/>}/>
        <Route path='PastReviews' element={<CustomerAcc.PastReviews/>}/>
    </Route>
    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);



