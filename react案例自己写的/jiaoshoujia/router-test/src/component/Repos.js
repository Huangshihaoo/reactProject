import React, {Component} from 'react';

// import Item from './Item'

import {Link} from 'react-router';

class Repos extends Component {

    constructor (props) {
        super (props);
        this.state = {
           data: [
            {name:'san',
            nikeName :'sharenkuangmo'
        },
        {
            name:'si',
            nikeName :'zhangsanlingju'
        },{
            name:'wu',
            nikeName:'gebilaowang'
        }
        ]}

        
    }

    render () {
        let {data} = this.state
        // console.log(data);
        return (
            <ul> 
                <h3>Repos</h3>
                 {
                data.map((item,index) => {
                return( 
                <li key={index}> 
                    <Link to={`/repos/${item.name}/${item.nikeName}`} >
                        {item.nikeName}
                    </Link> 
                </li>)
                })
            }
                {this.props.children}
            </ul>
          
        )
    }
}

export default Repos