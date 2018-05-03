import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import "./InitComponent.css";

export default class InitComponent extends Component{
    render(){
        return (
            <div className="ic-container">
                <div className="ic-title">
                    Escull una opció
                </div>
                <NavLink to="/load"><button className="ic-btn ic-btn-loadBtn">Carrèga</button></NavLink>
                <NavLink to="/open"><button className="ic-btn ic-btn-loadSaveBtn">Obre</button></NavLink>
            </div>
        );
    }
}