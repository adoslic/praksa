import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MainNavigation from './MainNavigation';

class Practice extends Component {
    constructor(props){
        super(props);
        
    }
    render() {
        switch(this.props.role){
            case 'Tvrtka': 
            return (
                <table >
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td>Naziv firme: </td>
                            <td>{this.props.profile.name}</td>
                        </tr>
                        <tr>
                            <td>Adresa: </td>
                            <td>{this.props.profile.address}</td>
                        </tr>
                        <tr>
                            <td>Kontakt: </td>
                            <td>{this.props.profile.phone}</td>
                        </tr>
                        <tr>
                            <td>Email adresa</td>
                            <td>{this.props.profile.email}</td>
                        </tr>
                        <tr>
                            <td>OIB</td>
                            <td>{this.props.profile.OIB}</td>
                        </tr>
                    </tbody>
                </table>
            );
            case 'Fakultet': 
                return (
                    <table >
                        <thead></thead>
                        <tbody>
                            <tr>
                                <td>Naziv fakultet: </td>
                                <td>{this.props.profile.name}</td>
                            </tr>
                            <tr>
                                <td>Naziv sveučilišta: </td>
                                <td>{this.props.profile.university}</td>
                            </tr>
                            <tr>
                                <td>Adresa: </td>
                                <td>{this.props.profile.address}</td>
                            </tr>
                            <tr>
                                <td>Kontakt: </td>
                                <td>{this.props.profile.phone}</td>
                            </tr>
                            <tr>
                                <td>Email adresa</td>
                                <td>{this.props.profile.email}</td>
                            </tr>
                            <tr>
                                <td>OIB</td>
                                <td>{this.props.profile.OIB}</td>
                            </tr>
                        </tbody>
                    </table>
                );
            case 'Student': 
                return (
                    <table >
                        <thead></thead>
                        <tbody>
                            <tr>
                                <td>ime studenta</td>
                                <td>{this.props.profile.name}</td>
                            </tr>
                            <tr>
                                <td>prezime studenta</td>
                                <td>{this.props.profile.lastName}</td>
                            </tr>
                            <tr>
                                <td>email studenta</td>
                                <td>{this.props.profile.email}</td>
                            </tr>
                            <tr>
                                <td>broj indeksa</td>
                                <td>{this.props.profile.indexNumber}</td>
                            </tr>
                            <tr>
                                <td>fakultet</td>
                                <td>{this.props.profile.faculty}</td>
                            </tr>
                            <tr>
                                <td>studij</td>
                                <td>{this.props.profile.study}</td>
                            </tr>
                            <tr>
                                <td>smjer</td>
                                <td>{this.props.profile.course}</td>
                            </tr>
                            <tr>
                                <td>godina studija</td>
                                <td>{this.props.profile.yearsOfStudy}</td>
                            </tr>
                            <tr>
                                <td>OIB</td>
                                <td>{this.props.profile.OIB}</td>
                            </tr>
                        </tbody>
                    </table>
                ); 
            default: return null;   
        }
        
    }
}
export default Practice;