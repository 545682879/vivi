
import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { Router, Link, Route ,browserHistory} from 'react-router';

import HelloHandler from './hello.js';
import Forms from './form.js';
import Timer from './timer.js';
import Menu from './menu.js';
import Data from './data.js';
import Template from './template.js';
import OperationStoreForm from './refluxActionListenTo.js';

require('../css/main');
require('../css/deputy');

let App = React.createClass({
  render() {
    return (
      <div className="nav">
        <Link to="/hello" className="hellolink">Say Hello</Link>
        <Link to="/timer" className="timerlink">Timer</Link>
        <Link to="/data" className="datalink">Data Growth</Link>
        <Link to="/form" className="formlink">Forms</Link>
        <Link to="/OperationStoreForm" className="formlink">OperationStoreForm</Link>
        <Link to="/template" className="formlink">Template</Link>
        {this.props.children}
      </div>
    );
  }
});


render(
  (<Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/hello" component={HelloHandler} />
      <Route path="/timer" component={Timer} />
      <Route path="/data" component={Data} />
      <Route path="/form" component={Forms} />
      <Route path="/OperationStoreForm" component={OperationStoreForm} />
      <Route path="/template" component={Template} />
    </Route>
  </Router>), document.getElementById('content'));
