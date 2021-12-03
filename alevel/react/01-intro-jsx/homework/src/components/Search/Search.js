import React, { Component } from 'react';
import Button from '../Button/Button';

const searchUrl = 'http://api.tvmaze.com/shows';

class Search extends Component {
    onSubmit = (e) => {
        e.preventDefault();
        fetch(searchUrl)
            .then((response) => response.json())
            .then((data) => {
                console.log('>>>', data)
            });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search..." />
                    <Button className="btn btn-outline-secondary" type="submit">
                        <i className='bi-search' />
                    </Button>
                </div>
            </form>
        )
    }
}

export default Search;
