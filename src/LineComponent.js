import React, { Component } from 'react';
import './LineComponent.css';

export default class LineComponent extends Component{
    render(){
        let {data, reference} = this.props;
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
            let cp = reference;
            for(let i=0;i<data.length;i++){
                let atask = data[i];
                if((atask.start-cp)>0){
                    tasks.push(<EmptyTask n={i} key={-(i+1)} duration={atask.start-cp} />);
                }
                tasks.push(<Task n={i} key={i} duration={atask.duration} bgc={this.props.options[atask.owner].color} process={atask.owner} />);
                cp = atask.start+atask.duration;
            }
        }
        return (
            <div className="lc-container">
                {tasks}
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
                style={{width: this.props.duration, backgroundColor: this.props.bgc}}>
                    {this.props.process}
            </div>
        );
    }
}