import React, { Component } from 'react';
import './App.css';
import MainComponent from "./MainComponent";
import {
  HashRouter,
  Route,
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Route path="/" component={MainComponent} />
      </HashRouter>
    );
  }
}

export default App;
