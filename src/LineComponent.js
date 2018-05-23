import React, { Component } from 'react';
import './LineComponent.css';

export default class LineComponent extends Component{
    constructor(props){
        super(props);

    }
    render(){
        return (
            <div className="lc-container">
                <div className="test">Test1</div>
                <div className="test">Test2</div>
                <div className="test">Test3</div>
                <div className="test">Test4</div>
            </div>
        );
    }
}