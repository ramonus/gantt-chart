import React, { Component } from 'react';
import './LineComponent.css';

export default class LineComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            stamps: null,
        };
        this.cElement = React.createRef();
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
    _onDrop = (e) => {
        let pixdrop = this.props.reference*this.props.resolution+e.clientX-this.cElement.current.offsetLeft;
        console.log("PixelDrop:",pixdrop);
        let timedrop = pixdrop/this.props.resolution;
        console.log("Timedrop:",timedrop);
        console.log(e.dataTransfer.getData("text"));
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
                    tasks.push(<EmptyTask n={i} key={-(i+1)} resolution={this.props.resolution} duration={atask.start-cp} />);
                }
                tasks.push(<Task n={i} key={i} task={atask} bgc={this.props.options[atask.owner].color} resolution={this.props.resolution} />);
                cp = atask.start+atask.duration;
            }
        }
        const stamps = this.createStamps();
        return (
            <div className="lc-container"
                ref={this.cElement}
                onDragOver={(e) => e.preventDefault()}
                onDrop={this._onDrop.bind(this)}>
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
                style={{width: this.props.duration*this.props.resolution}}></div>
        );
    }
}
class Task extends Component{
    _onDragHandler = (e) => {
        e.dataTransfer.setData("text", "Eeeeeseeee");
        // console.log(e.dataTransfer.getData("text"));
    }
    render(){
        return (
            <div
                draggable={true}
                onDragStart={this._onDragHandler.bind(this)}
                key={this.props.n}
                className="lc-task"
                style={
                    {
                        backgroundColor: this.props.bgc,
                        width: this.props.task.duration*this.props.resolution,
                    } 
                } >
                    {this.props.task.owner}
            </div>
        );
    }
}