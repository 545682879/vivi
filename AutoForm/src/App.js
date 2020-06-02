import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Link
} from "react-router-dom";
import Config from './config/create';
import NormalFormExample from  './testpage/form';
import TestExample from  './config/test';
import './App.css';
import 'antd/dist/antd.css'; 

function App() {
  return (
    <div className="App">
      <Router>
      <div>
        <nav className="nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/form">Form</Link>
            </li>
            <li>
              <Link to="/config">Config</Link>
            </li>
            <li>
              <Link to="/test">Test</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/form">
            <NormalFormExample />
          </Route>
          <Route path="/config">
            <Config />
          </Route>
          <Route path="/test">
            <TestExample />
          </Route>
          <Route path="/">
            <NormalFormExample />
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;
