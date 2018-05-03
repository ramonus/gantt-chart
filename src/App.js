import React, { Component } from 'react';
import './App.css';
import MainComponent from "./MainComponent";
import {
  HashRouter,
  Route,
} from 'react-router-dom';
import ChartDisplay from './ChartDisplay';

class App extends Component {
  render() {
    return (
      <HashRouter basename="/">
      <div>
        <Route exact path="/" component={MainComponent} />
        <Route path="/load" component={ChartDisplay} />
        <Route path="/open" component={ChartDisplay} />
      </div>
      </HashRouter>
    );
  }
}

export default App;
