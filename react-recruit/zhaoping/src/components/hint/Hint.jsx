/**
 * 提示文本的
*/

import React from 'react'
import './hint.css'

export default function Hint(props) {
   return <div className='hint'>{props.children}</div>
}