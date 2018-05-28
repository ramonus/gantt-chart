import React, { Component } from 'react';
import "./Stamp.css";

export default class Stamp extends Component{
    render(){
        return (
            <div className="st-stamp"
                style={{left: this.props.left}}>
                {this.props.text+":00"}
            </div>
        );
    }
}