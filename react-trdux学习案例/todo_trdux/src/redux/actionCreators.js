import {
        ADD, 
        CLICK_DELETE,
        INPUT_VALUE
        } from './actionTypes'

export const addAction = () => ({
    type: ADD
})

export const clickDeleteAction = (index) => ({
    type: CLICK_DELETE,
    index

})

export const inputChangeAction = (value) => ({
    type: INPUT_VALUE,
    value

})

