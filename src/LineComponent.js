import React, { Component } from 'react';
import './LineComponent.css';

export default class LineComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            stamps: null,
        };
    }
    createStamps = () => {
        if(this.props.ticks){
            let stamps = new Array(this.props.ticks.length);
            this.props.ticks.forEach((tick,ti) => {
                stamps[ti] = (
                    <div className="lc-stamp"
                        style={{left: tick.props.style.left}}
                        key={stamps.length+ti} >
                    </div>
                );
            });
            return stamps;
        }else{
            return null;
        }
    }
    render(){
        let {data, reference, resolution} = this.props;
        let tasks;
        if(!data){
            let n = 4;
            tasks = new Array(n*2);
            for(let i=0;i<n*2;i+=2){
                tasks[i] = <Task n={i} key={i} duration={90} />;
                tasks[i+1] = <EmptyTask n={i+1} key={i+1} duration={30} />;;
            }
        }else{
            tasks = [];
            let cp = reference*resolution;
            for(let i=0;i<data.length;i++){
                let atask = data[i];
                if((atask.start-cp)>0){
                    tasks.push(<EmptyTask n={i} key={-(i+1)} duration={atask.start-cp} />);
                }
                tasks.push(<Task n={i} key={i} duration={atask.duration} bgc={this.props.options[atask.owner].color} process={atask.owner} />);
                cp = atask.start+atask.duration;
            }
        }
        const stamps = this.createStamps();
        return (
            <div className="lc-container">
                {tasks}
                {stamps}
            </div>
        );
    }
}

class EmptyTask extends Component{
    render(){
        return (
            <div className="blank"
                key={this.props.n}
                style={{width: this.props.duration}}></div>
        );
    }
}
class Task extends Component{
    render(){
        return (
            <div
                key={this.props.n}
                className="lc-task"
                style={{width: this.props.duration, backgroundColor: this.props.bgc}}>
                    {this.props.process}
            </div>
        );
    }
}