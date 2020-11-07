import React,{Component} from 'react';

class Search extends Component {

    search = ()=> {
        this.props.ajax(this.refs.searchTxt.value);
        this.refs.searchTxt.value = ''
    }

    render () {
        return (
            <div>
                 <input ref='searchTxt' type="search" />
                 <button onClick={this.search}>search</button>
            </div>
        )
    }
}

export default Search