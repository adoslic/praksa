import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MainNavigation from './MainNavigation';

class Practice extends Component {
    constructor(){
        super();
        this.state = {
            userRole: localStorage.getItem('role')
        }
    }
    render() {
        return (
            <div>
                Practice
                {/* dohvati sve prakse i prikaži ih u tablici */}

                {(this.state.userRole != null)?
                    <MainNavigation role={this.state.userRole}/>
                    :null
                }

            </div>
        );
    }
}
export default Practice;