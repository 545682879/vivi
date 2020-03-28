import React from 'react';
import './App.css';
import Normalform from './testpage/normalform';
import Create from './config/create';
import { HashRouter as Router, Link, Route } from 'react-router-dom';
import 'antd/dist/antd.css'; 

function App() {
  return <div className="App">
           <Router>
        <div className="App">
          {/* <Link to="/">Home</Link> */}
          <Link to="/form">表单页面</Link>
          <span style={{width: '20px', display: 'inline-block'}}/>
          <Link to="/config">配置页面</Link>
          <hr/>
          {/* <Route path="/" exact component={Home}></Route> */}
          <Route path="/form" component={Normalform}></Route>
          <Route path="/config" component={Create}></Route>
        </div>
      </Router>
    </div>
}

export default App;
