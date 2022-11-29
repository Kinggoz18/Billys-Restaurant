//Import Modules
import React from 'react';
import  ReactDOM  from 'react-dom/client';
import './Styles/index.css';
import $ from 'jquery';
import {UpperSection} from './components/backgroundComponents.js'

//Main Component for rendering the app
class Body extends React.Component{
    render(){
        return(
           <UpperSection />
        );
    }
}



const Root = ReactDOM.createRoot(document.getElementById('root'));
Root.render(<Body />);

