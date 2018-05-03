import React, { Component } from 'react';

export default class ChartDisplay extends Component{

    constructor(props){
        super(props);
        let m, p;
        if(props.data){
            let {machines,processes} = props.data;
            m = machines;
            p = processes;
        }
        if(!p) p = [];
        if(!m) m = [];
        this.state = {
            processes:p,
            machines:m,
        };
    }
    render(){
        return (
            <div align="center">
                <h1>ChartDisplay</h1>
                <div className="cd-container">
                    <h2>Processes: {JSON.stringify(this.state.processes)}</h2>
                    <h2>Machines: {JSON.stringify(this.state.machines)}</h2>
                </div>
            </div>
        );
    }
}