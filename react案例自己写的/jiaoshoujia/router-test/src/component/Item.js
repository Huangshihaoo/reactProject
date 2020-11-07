import React from 'react';
// import {Link} from 'react-router';

export default  function Item(props) {
    console.log(props.params);
   let {routeParams} = props
    // console.log(props);

return <div>他叫：{routeParams.name} 昵称 {routeParams.nikeName}</div>
}