import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';

class Navigation extends Component {
    constructor(){
        super();
    }
    render() {
            return(
                <div className="btn-group offset-md-3 col-md-6 offset-md-3" role="group">
                    <NavLink exact  to='/' className="navbar-brand">Početna stranica</NavLink>
                    <NavLink to='/login' className="navbar-brand">Prijava</NavLink>
                    <NavLink to='/register' className="navbar-brand">Registracija</NavLink>
                </div>
            )
    }
}
export default Navigation;