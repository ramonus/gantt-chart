import React, { Component } from 'react';
import InitComponent from './InitComponent';
import "./MainComponent.css";

export default class MainComponent extends Component{

    render(){
        return (
            <div className="container">
                <h1>Main component</h1>
                <br />
                <InitComponent />
            </div>
        );
    }
}