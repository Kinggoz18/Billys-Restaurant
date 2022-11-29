import { Navbar, Home, Footer} from './components/index';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const App = () => {
  return (
    <div>
      <Navbar />
      <Home/>
      <Footer />
    </div>

  );
}

//On click function to change current component
function ComponentController(componentToRender){
  console.log(`Rendering ${componentToRender}... Needs Implementation!`);
}


ReactDOM.render(<App />, document.getElementById('root'));

