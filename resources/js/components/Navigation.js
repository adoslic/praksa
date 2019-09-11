import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navigation extends Component {
    constructor(){
        super();
    }
    render() {
            return(
                <div className="btn-group offset-md-3 col-md-6 offset-md-3 x" role="group">
                    <NavLink exact  to='/' className="navbar-brand" id="poc" >
                        Početna stranica
                        </NavLink>
                    <NavLink to='/login' className="navbar-brand" id="pri">Prijava</NavLink>
                    <NavLink to='/register' className="navbar-brand" id="reg">Registracija</NavLink>
                </div>
            )
    }
}
export default Navigation;