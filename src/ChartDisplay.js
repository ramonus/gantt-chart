import React, { Component } from 'react';
import "./ChartDisplay.css";
import TimeBar from './TimeBar';
import LineComponent from './LineComponent';
const Core = require("./core");

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
        if(!m) m = this.loadTestData();
        this.state = {
            core: new Core(m,p),
        };
    }
    loadTestData = () => {
        let machines = [
            {
                name: "M1",
                workingHours: {start: 8, end: 17},
                workingDays: "all",
            },
            {
                name: "M2",
                workingHours: "24",
                workingDays: "all",
            }
        ];
        let processes = [
            {
                name: "P1",
                start: new Date(),
                tasks: [
                    {
                        owner: "P1",
                        line: "M1",
                        index: 0,
                        duration: 3600000, // 3600000ms --> 1h
                    },
                    {
                        owner: "P1",
                        line: "M2",
                        index: 1,
                        duration: 1500000, // 1500000
                    }
                ],
            }
        ];
        return machines;
    }
    render(){
        const tableIn = this.state.core.getLines().map((line, index) => {
            return (
                <tr key={index}>
                    <td
                    className="cd-lineName">{line.name}</td>
                    <td className="cd-line"><LineComponent /></td>
                </tr>
            );
        });
        return (
            <div align="center">
                <h1>ChartDisplay</h1>
                <div className="cd-container">
                    <table border="1"className="cd-table">
                        <thead>
                            <TimeBar units='days' resolution={15} />
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