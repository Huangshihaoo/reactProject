import {ADD, CLICK_DELETE, INPUT_VALUE} from './actionTypes'

const data = {
    inputValue: '',
    list: [
        '吃饭',
        '睡觉',
        '敲代码'
    ] 
}

export default (state = data, action) => {

    // 获取input值
    if(action.type === INPUT_VALUE) {
        let newState = JSON.parse(JSON.stringify(state))
        newState.inputValue = action.value
        return newState
    }

    // 增加todo项
    if(action.type === ADD) {
        let newState = JSON.parse(JSON.stringify(state))
        newState.list.push(newState.inputValue)
        console.log(1);
        newState.inputValue = ''
        return newState
    }

    // 删除项
    if (action.type === CLICK_DELETE) {
        let newState = JSON.parse(JSON.stringify(state))
        newState.list.splice(action.value, 1)
        return newState
    }

    return state
}