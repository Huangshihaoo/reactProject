import React, {Component} from 'react';

import {Link} from 'react-router';

// import About from './About';

class App extends Component {
    render () {
        return (
           <ul>
                <li>
                    <Link activeClassName="aaa" to='/about'>about</Link>
                </li>
                <li>
                    <Link  activeClassName="aaa" to='/repos'>repos</Link>
                </li>

                {this.props.children}
           </ul>
        )
    }
}

export default App