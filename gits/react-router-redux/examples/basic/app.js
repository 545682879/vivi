import "babel-polyfill"
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
import promiseMiddleware from 'redux-promise';
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import * as reducers from './reducers'
import plaint from './reducers/plaint'
import { App, Home, Foo, Bar, PromiseTest } from './components'

console.log("plaint", plaint);

const reducer = combineReducers({
  ...reducers,
  plaint: plaint,
  routing: routerReducer
})
console.log(reducer);
const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
)

/*const store = createStore(
  reducer,
  DevTools.instrument()
)
*/

let createStoreWithPromise = applyMiddleware(promiseMiddleware)(createStore);
const store = createStoreWithPromise(reducer,DevTools.instrument());

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="foo" component={Foo}/>
          <Route path="bar" component={Bar}/>
          <Route path="promiseTest" component={PromiseTest}/>
        </Route>
      </Router>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('mount')
)
