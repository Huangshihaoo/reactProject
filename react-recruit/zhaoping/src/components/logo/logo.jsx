/**
 * logo组件 只显示logo
 */

import React from 'react'
import logo from './logo.png'
import './logo.css'


export default function Logo() {
    return (
      <div className='logo'>
        <img className='logo_png' src={logo} alt="logo"/>
      </div>
    )
}