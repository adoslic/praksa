import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Navigation from './Navigation';

class Home extends Component {
    render() {
        return (
            <div>
                <Navigation/>
                <p>Home page. welcome. neka slika/logo?</p>
            </div>
        );
    }
}
export default Home;