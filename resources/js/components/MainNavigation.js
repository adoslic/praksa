import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';

class MainNavigation extends Component {
    constructor(props){
        super(props);
    }

    checkRole(){
        if(this.props.role === 'Tvrtka'){
            return (
                <div>
                    <NavLink to='/practice'>Prakse</NavLink>
                    <NavLink to='/profile' >Profil</NavLink>
                    <NavLink to='/logout' >Logout</NavLink>

                    <h1>Tvrtka</h1>
                </div>
            )
        }
        else if(this.props.role === 'Fakultet'){
            return (
                <div>
                    <NavLink to='/students'>Studenti</NavLink>
                    <NavLink to='/practice'>Prakse</NavLink>
                    <NavLink to='/profile' >Profil</NavLink>
                    <NavLink to='/logout' >Logout</NavLink>

                    <h1>Fakultet</h1>
                </div>
            )
        }
        else{
            return (
                <div>
                    <NavLink to='/practice'>Prakse</NavLink>
                    <NavLink to='/profile' >Profil</NavLink>
                    <NavLink to='/logout' >Logout</NavLink>

                    <h1>Student</h1>
                </div>
                
            )
        }
    }
    render() {
        return(
            <div>
                {this.checkRole()}

                {/* <NavLink to='/studenti'>Studenti</NavLink>
                <NavLink to='/praksa'>Prakse</NavLink>
                <NavLink to='/profil' >Profil</NavLink>
                <NavLink to='/logout' >Logout</NavLink> */}

            </div>
        )
    }
}
export default MainNavigation;