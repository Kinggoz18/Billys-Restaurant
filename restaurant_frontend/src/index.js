import { Navbar, Home, Footer, Menu} from './components/index';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

let slideIndex = 0;
class LoadPage extends React.Component{
  render(){
      /*NOTE: REMEMBER A COMPONEMNT RERENDERS WHENEVER A STATE IS CHANGED */
      let Current = this.props.current;
      console.log(Current);
      return(
          <Current></Current>
      );
  }
}
class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      pages: [Home, Menu],
      current: Home
    }
  }
  renderPage(i){
    LoadSlideIndex(i);
    this.setState({
      current: this.state.pages[slideIndex],
    });
  }
  render(){
    return (
      <div>
        <Navbar onClick={(i)=>{this.renderPage(i)}}/>
        <LoadPage current={this.state.current}/>
        <Footer />
      </div>
    );
  }
}

function LoadSlideIndex(i)
{
    if(i === "Home")
    {
        slideIndex = 0;
    }
    else if(i === "Menu")
    {
        slideIndex = 1;
    }
    else if(i === "ChangeMe")
    {
        slideIndex = 2;
    }
    else if(i === "ChangeMe"){
        slideIndex = 3;
    }
    else if(i === "ChangeMe")
    {
        slideIndex = 4;
    }
}
//On click function to change current component


ReactDOM.render(<App />, document.getElementById('root'));

