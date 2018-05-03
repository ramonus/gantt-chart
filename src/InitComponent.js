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
                <button className="ic-btn ic-btn-loadBtn">Carrega</button>
                <button className="ic-btn ic-btn-loadSaveBtn">Obre</button>
            </div>
        );
    }
}