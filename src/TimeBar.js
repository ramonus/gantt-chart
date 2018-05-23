import React, { Component } from 'react';
import "./TimeBar.css";

export default class TimeBar extends Component{
    constructor(props){
        super(props);
        
    }
    render(){
        return (
            <tr>
                <td>PR</td>
                <td className="tb-rule-container">
                    <div className="tb-rule"></div>
                </td>
            </tr>
        );
    }
}