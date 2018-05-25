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
            let { resolution } = this.props;
            let size = this.bottomLine.current.offsetWidth;
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
    _getDateString = (time) => {
        let d = new Date();
        d.setTime(time);
        switch(this.props.units){
            case 'hours':
                return d.toLocaleTimeString().split(":")[0];
            default:
                return d.toLocaleDateString();
        }

    }
    render(){
        return (
            <tr>
                <td>PR</td>
                <td className="tb-rule-container">
                    <div className="tb-rule">
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