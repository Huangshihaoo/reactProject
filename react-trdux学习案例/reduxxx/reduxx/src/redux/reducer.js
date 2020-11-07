// https://www.easy-mock.com/mock/5cfcce489dc7c36bd6da2c99/xiaojiejie/getList
import {GET_LIST} from './actionType'

export default (state = {}, action) => {
    switch (action.type) {
        case GET_LIST:
            let newState = JSON.parse(JSON.stringify(state))
            newState = action.data
            console.log(newState);
            return newState
        default:
            return state
    }
} 