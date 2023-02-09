import React from "react";
import  $  from "jquery";
import { Accounts } from "../Objects/ObjectExports";

//Defaul customer home
function Home(props){
    return(<div>
        <p>{JSON.stringify(props.AccountInfo)}</p>
    </div>)
}

function LoadCustomerComponent(props){
    let Current = props.Current;
    return(<Current AccountInfo={props.AccountInfo}></Current>);
}

//Controller for customer account components
export class CustomerAccount extends React.Component{
    constructor(props){
        super(props);
        this.state={
            AccountInfo: this.props.AccountInfo,
            Slides: [Home],
            Current: Home
        }
    }
    render(){
        return(<LoadCustomerComponent Current={this.state.Current} AccountInfo={this.state.AccountInfo}></LoadCustomerComponent>)
    }

}