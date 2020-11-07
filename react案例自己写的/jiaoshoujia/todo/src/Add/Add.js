import React from 'react';

import './Add.css'

class Add extends React.Component {

    constructor (props) {
        super(props)
        this.click = this.click.bind(this)
    }
    click () {

        if(!this.refs.name.value.trim() || !this.refs.msg.value.trim() ) {
            window.alert('请输入名字或者内容'); 
            return;
        } 

        let comment = {
            name : this.refs.name.value,
            msg : this.refs.msg.value
        }

        this.props.add(comment);
        this.refs.name.value = '';
        this.refs.msg.value = '';
    }
    render () {
        return (
            <div className='box' >
                <div>
                    <p>用户名</p>
                    <input  placeholder='用户名' ref='name' type="text"/>
                </div>
                <div>
                    <p>评论内容</p>
                    <textarea cols="30" rows="10" ref='msg' placeholder='评论内容'></textarea>
                </div>
                <button onClick={this.click} className='btn'>提交</button>
            </div>
        )
    }
}

export default Add