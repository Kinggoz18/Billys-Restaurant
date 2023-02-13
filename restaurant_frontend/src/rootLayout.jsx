import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar, Footer } from "./components";
import {useState, useEffect} from 'react';

export class RootLayout extends React.Component{
    constructor(props){
        super(props);
        this.state={
            AccountInfo: null
        }
    }
    render(){
      return(
          <div className="root-layout">
              <Navbar/>
              <main>
                  <Outlet/>
              </main>
              <Footer/>
          </div>
      );
    }
}
export const GetCurrentPage = (props) => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const location = useLocation();
  
    useEffect(() => {
      setCurrentLocation(location);
    }, [location]);
  
    return currentLocation;
  };