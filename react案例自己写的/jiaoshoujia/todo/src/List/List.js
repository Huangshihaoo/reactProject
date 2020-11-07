import React from 'react';

import Rem from '../Rem/Rem'

import './List.css'

class List extends React.Component {
    constructor (props) {
        super (props);
        
        this.delete = this.delete.bind(this)

        this.item = this.props.item

        this.flag = 'none' 
    }

    delete (index) {
        this.item.splice(index,1);
        this.setState({item :this.item})
    }

    render () { 
       let {item} = this

        if(item.length === 0) {
            this.flag =''
        }else {
            this.flag ='none'
        }
        return (
            <ul>
                <p>评论回复：</p>
                <h2 style={{display : this.flag }}> 暂时没有内容 </h2>
                 {
                   item.map((item,index) => {
                        return <li key={index}>{item.name}说 ：
                                    <p>{item.msg}</p> 
                                    <Rem del={this.delete} index={index} />
                                </li> 
                    })
                }
            </ul>
        )
    }
}

export default List