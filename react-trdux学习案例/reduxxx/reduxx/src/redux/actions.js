import {GET_LIST} from './actionType'
// import axios from 'axios'
import {reqRegister} from '../api/index'


export const getListAction = (data) => ({
    type: GET_LIST,
    data
})

export const getList = () => {
    return (dispatch) => {
        reqRegister()
        .then((res) => {
            const data = res.data
            console.log(data);
        })
    }
}