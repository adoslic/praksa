import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';

class MainNavigation extends Component {
    constructor(props){
        super(props);
    }

    checkRole(){
        if(this.props.role === 'Fakultet'){
            return (
                <div>
                    <NavLink to='/students'>Studenti</NavLink>
                    <NavLink to='/practise'>Prakse</NavLink>
                    <NavLink to='/reports' >Izvještaji</NavLink>
                    <NavLink to='/grades' >Ocjene</NavLink>
                    <NavLink to='/profile' >Profil</NavLink>
                    <NavLink to='/logout' >Logout</NavLink>

                    <h1>Fakultet</h1>
                </div>
            )
        }
        else if(this.props.role === 'Student'){
            return (
                <div>
                    <NavLink to='/practise'>Prakse</NavLink>
                    <NavLink to='/mypractise'>Moja praksa</NavLink>
                    <NavLink to='/profile' >Profil</NavLink>
                    <NavLink to='/logout' >Logout</NavLink>

                    <h1>firma ili student</h1>
                </div>
            )
        }
        else{
            return (
                <div>
                    <NavLink to='/practise'>Prakse</NavLink>
                    <NavLink to='/reports' >Izvještaji</NavLink>
                    <NavLink to='/profile' >Profil</NavLink>
                    <NavLink to='/logout' >Logout</NavLink>

                    <h1>firma ili student</h1>
                </div>
            )
        }
        
    }
    render() {
        return(
                this.checkRole()
        )
    }
}
export default MainNavigation;