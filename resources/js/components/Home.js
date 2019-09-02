import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Navigation from './Navigation';

class Home extends Component {
    render() {
        return (
            <div className='hole-page'>
                <div className="container">
                    <Navigation/>
                    <div className="logo">
                        <img src='/images/logo.png'/>
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;