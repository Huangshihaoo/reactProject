import React, { Component } from 'react'
import {Input, Button, List} from 'antd'
import '../node_modules/antd/dist/antd.css'
const Item = List.Item

class AppUI extends Component {
 
    render() {
        return (
            <div>
                <div style={{width:"300px"}}>
                    <Input
                        style={{width:"250px"}}
                        placeholder='xxx'
                        value={this.props.state.inputValue}
                        onChange={(e)=> {this.props.inputChange(e)}}
                    ></Input>
                    <Button
                        onClick={() => {this.props.add()}}
                        style={{width:"50px"}}
                    >增加</Button>
                </div>
                <div style={{width:"300px"}}>
                    <List
                        bordered
                        dataSource={this.props.state.list}
                        renderItem={(item, index) =>(<Item onClick={() => {this.props.clickDelete(index)}}>{item}</Item>)}
                    ></List>
                </div>
            </div>
        )
    }
}

export default AppUI