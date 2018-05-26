import React, { Component } from 'react';
import TimeBar from './TimeBar';
import LineComponent from './LineComponent';
import "./ChartDisplay.css";
const Core = require("./core");
var defaults = require("./defaults");

export default class ChartDisplay extends Component{

    constructor(props){
        super(props);
        let m, p, u, r;
        if(props.data){
            let {machines,processes,units,resolution} = props.data;
            m = machines;
            p = processes;
            u = units;
            r = resolution;
        }
        if(!p) p = defaults.processes;
        if(!m) m = defaults.lines;
        if(!u) u = 'days';
        if(!r) r = 60;
        let config = {
            lines: m,
            processes: p,
            reference: p.reduce((prev, current) => {
                if(prev.start>=current.start){
                    return current;
                }else{
                    return prev;
                }
            }, 0),
            resolution: r,
            units: u,
        }
        this.state = {
            core: new Core(config),
            units: u,
            resolution: r,
        };
        console.log("Processes:",defaults.processes);
    }
    render(){
        const tableIn = this.state.core.getLines().map((line, index) => {
            let parr = this.state.core.getProjections()[line.name];
            let popt = this.state.core.genOptions().processes;
            return (
                <tr key={index}>
                    <td
                    className="cd-lineName">{line.name}</td>
                    <td className="cd-line"><LineComponent data={parr} options={popt} reference={this.state.core.getReference()} units={this.state.units} resolution={this.state.resolution} /></td>
                </tr>
            );
        });
        return (
            <div align="center">
                <h1>ChartDisplay</h1>
                <div className="cd-container">
                    <table border="1"className="cd-table">
                        <thead>
                            <TimeBar units={this.state.units} resolution={this.state.resolution} />
                        </thead>
                        <tbody className="cd-content">
                            {tableIn}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}