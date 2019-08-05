import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';

class Navigation extends Component {
    constructor(){
        super();
    }
    render() {
            return(
                <div>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/login'>Login</NavLink>
                    <NavLink to='/register'>Register</NavLink>
                </div>
            )
    }
}
export default Navigation;