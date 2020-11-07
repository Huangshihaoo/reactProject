import React, {Component} from 'react';

class Rem extends Component {
    constructor (props) {
        super (props);
        this.remove = this.remove.bind(this);
    }
    
    remove () {
       this.props.del(this.props.index)
    }

    render () {
        
        return (
            <button onClick={this.remove}>删除</button>
        )
    }
}

export default Rem