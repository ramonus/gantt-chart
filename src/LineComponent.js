import React, { Component } from 'react';
import './LineComponent.css';

export default class LineComponent extends Component{
    render(){
        const test = (props) => <div className="test" key={props.n} style={{width: props.duration}}>Test {props.n}</div>;
        const empty = (props) => (
            <div className="blank"key={props.n}style={{width:props.duration}}></div>
        );
        let n = 4;
        let tasks = new Array(n*2);
        for(let i=0;i<n*2;i+=2){
            tasks[i] = test({duration: 60, n:i});
            tasks[i+1] = empty({duration: 15, n:i+1});
        }
        console.log(tasks);
        return (
            <div className="lc-container">
                {tasks}
            </div>
        );
    }
}