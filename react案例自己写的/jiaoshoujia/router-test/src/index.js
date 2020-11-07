import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/App';
import {Router, Route, IndexRoute, hashHistory} from 'react-router'
import About from './component/About'
import Repos from './component/Repos'
import Home from './component/Home';
import Item from './component/Item';

ReactDOM.render ((
<Router history={hashHistory}>
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='/about' component={About}></Route>
    <Route path='/repos' component={Repos}>
      <Route path='/repos/:name/:nikeName' component={Item}></Route>
    </Route>
  </Route>
</Router>
),document.querySelector('#root'))

// ReactDOM.render(<App />,document.getElementById('root'));

