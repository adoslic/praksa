import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';

class MainNavigation extends Component {
    constructor(props){
        super(props);
    }

    checkRole(){
        return (
                    <div className="btn-group offset-md-2 col-md-8 offset-md-2 x" role="group">
                        {(this.props.role === 'Fakultet')?
                            <NavLink to='/students' className="navbar-brand" id="stu">Studenti</NavLink>
                        :null}
                        {/* {(this.props.role === 'Fakultet' || this.props.role === 'Tvrtka')? */}
                            <NavLink to='/practise' className="navbar-brand" id="pra">Prakse</NavLink>
                        {/* :null} */}
                        {(this.props.role === 'Student')?
                            <NavLink to='/mypractise' className="navbar-brand" id="mpr">Moja praksa</NavLink>
                        :null}
                        {(this.props.role === 'Fakultet' || this.props.role === 'Tvrtka')?
                            <NavLink to='/reports' className="navbar-brand" id="izv">Izvještaji</NavLink>
                        :null}
                        {(this.props.role === 'Fakultet')?
                            <NavLink to='/grades' className="navbar-brand" id="ocj">Ocjene</NavLink>
                        :null}
                        {(this.props.role === 'Tvrtka')?
                            <NavLink to='/archives' className="navbar-brand" id="arh">Arhiva</NavLink>
                        :null}
                        <NavLink to='/profile' className="navbar-brand" id="pro">Profil</NavLink>
                        <NavLink to='/logout' className="navbar-brand" id="odj">Odjava</NavLink>
    
                        
                    </div>
                )
    }
    render() {
        return(
                this.checkRole()
        )
    }
}
export default MainNavigation;