import React, { Component } from 'react';
import TimeBar from './TimeBar';
import LineComponent from './LineComponent';
import "./ChartDisplay.css";
const Core = require("./core");
var defaults = require("./defaults");

export default class ChartDisplay extends Component{
    /* ChartDisplay is the component where all the chart goes in
        it recives machines,processes,units and resolution as variable data in props and executes all calculations to make the display
        
        machines: the machines, stages or lines where the processes take place
        processes: the collection of tasks or units of work that compose a prcess. A process can be executed in multiple machines
        units: The units of time, "minutes", "hours"...
        resolution: the number of pixels per unit
    */
    constructor(props){
        super(props);
        let m, p, u, r;
        if(props.data){ // Check if data is recived
            let {machines,processes,units,resolution} = props.data;
            m = machines;
            p = processes;
            u = units;
            r = resolution;
        }

        // in case any variable is not found, apply a default value
        if(!p) p = defaults.processes;
        if(!m) m = defaults.lines;
        if(!u) u = 'hours';
        if(!r) r = 60;


        let config = {
            lines: m, // the lines will be the machines
            processes: p,   // add the processes to the config
            reference: p?p.reduce((prev, current) => { // the reference is the minimum time of current processes. It's the "x axis reference (=0)"
                if(prev.start>=current.start){
                    return current;
                }else{
                    return prev;
                }
            }).start:0,
            resolution: r, // pass resolution
            units: u,   // pass units
        };
        this.state = {
            core: new Core(config), // genrate a new core object with the config data
            units: u,
            resolution: r,
            reference: config.reference,
        };
    }
    _onCreateTicksHandler = (ticks) => {
        // updates the ticks for time movement
        this.setState({ticks});
    }
    render(){
        const tableIn = this.state.core.getLines().map((line, index) => {
            let parr = this.state.core.getProjections()[line.name]; // get the process array (parr) which belong to a line name
            let popt = this.state.core.genOptions().processes;
            return (
                // this creates a table row for every line and inserts all data
                <tr key={index}>
                    <td
                    className="cd-lineName">{line.name}</td>
                    <td className="cd-line">
                        <LineComponent //create a line component with all attributes
                            data={parr}
                            options={popt}
                            reference={this.state.core.getReference()}
                            units={this.state.units}
                            ticks={this.state.ticks}
                            resolution={this.state.resolution} />
                    </td>
                </tr>
            );
        });
        return (
            <div align="center">
                <h1>ChartDisplay</h1>
                <div className="cd-container">
                    <table border="1"className="cd-table">
                        <thead>
                            <TimeBar
                                onCreateTicks={this._onCreateTicksHandler.bind(this)}
                                units={this.state.units}
                                reference={this.state.reference}
                                resolution={this.state.resolution} />
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