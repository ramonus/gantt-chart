import React, { Component } from 'react';
import "./TimeBar.css";

export default class TimeBar extends Component{
    constructor(props){
        super(props);
        this.bottomLine = React.createRef();
        this.state = {
            ticks: null,
            width: "99%",
        };
    }
    componentDidMount(){
        this.createTicks();
        window.addEventListener("resize", this.createTicks.bind(this));
    }
    createTicks = () => {
        this.setState({width: "99%"},() => {
            let { units, resolution } = this.props;
            let size = this.bottomLine.current.offsetWidth;
            let as = Math.floor(size/resolution);
            console.log("Size:",size,"\nAL:",as,"\nres:",resolution);
            let ticks = new Array(Math.floor(size/resolution)+1);
            for(let i=0;i<ticks.length;i++){
                ticks[i] = (
                    <div key={i}className="tb-sline"style={{left: i*resolution}}></div>
                );
            }
            let correctWidth = resolution*(ticks.length-1);
            this.setState({ticks,width: correctWidth});
        });
    }
    render(){
        const { units, resolution } = this.props;
        console.log("units:",units," Resolution:",resolution);
        return (
            <tr>
                <td>PR</td>
                <td className="tb-rule-container">
                    <div className="tb-rule"
                        onMouseOver>
                        <div ref={this.bottomLine}
                            style={{width:this.state.width}}
                            className="tb-bottomline"></div>
                        {
                            this.state.ticks||null
                        }
                    </div>
                </td>
            </tr>
        );
    }
}