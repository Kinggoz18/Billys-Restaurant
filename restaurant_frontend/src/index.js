//Import Modules
import React from 'react';
import  ReactDOM  from 'react-dom/client';
import './Styles/index.css';
import $ from 'jquery';


//Main Component for rendering the app
class Body extends React.Component{
    render(){
        return(
            <div>
                <h1>Island Cusine</h1>
            </div>
        );
    }
}


const Root = ReactDOM.createRoot(document.getElementById('root'));
Root.render(<Body />);

