import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MainNavigation from './MainNavigation';

class ProfileList extends Component {
    constructor(props){
        super(props);
        
    }
    render() {
        switch(this.props.profile.user.role){
            case 'Tvrtka': 
            return (
                <table className="offset-md-1 col-md-10 offset-md-1">
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td><label className="col-form-label">Naziv tvrtke:</label></td>
                            <td>{this.props.profile.user.name}</td>
                        </tr>
                        <tr>
                            <td><label className="col-form-label">Adresa:</label></td>
                            <td>{this.props.profile.address}</td>
                        </tr>
                        <tr>
                            <td><label className="col-form-label">Telefon:</label></td>
                            <td>{this.props.profile.phone}</td>
                        </tr>
                        <tr>
                            <td><label className="col-form-label">Email adresa:</label></td>
                            <td>{this.props.profile.user.email}</td>
                        </tr>
                        <tr>
                            <td><label className="col-form-label">OIB:</label></td>
                            <td>{this.props.profile.OIB}</td>
                        </tr>
                    </tbody>
                </table>
            );
            case 'Fakultet': 
                return (
                    <table className="offset-md-1 col-md-10 offset-md-1">
                        <thead></thead>
                        <tbody>
                            <tr>
                                <td><label className="col-form-label">Naziv fakulteta:</label> </td>
                                <td>{this.props.profile.user.name}</td>

                                {/* SKONTAJ DA NAPRAVIŠ LJEPŠI PRIKAZ  */}
                                {/* <td>
                                    <div class="card">
                                        <div class="card-body">
                                            <label className="col-form-label">Naziv fakulteta: {this.props.profile.user.name}</label>
                                            {/* <div>{this.props.profile.user.name}</div> }
                                        </div>
                                    </div>
                                </td> */}
                            </tr>
                            <tr>
                                <td><label className="col-form-label">Naziv sveučilišta:</label></td>
                                <td>{this.props.profile.university}</td>
                            </tr>
                            <tr>
                                <td><label className="col-form-label">Adresa:</label></td>
                                <td>{this.props.profile.address}</td>
                            </tr>
                            <tr>
                                <td><label className="col-form-label">Telefon:</label></td>
                                <td>{this.props.profile.phone}</td>
                            </tr>
                            <tr>
                                <td><label className="col-form-label">Email adresa:</label></td>
                                <td>{this.props.profile.user.email}</td>
                            </tr>
                            <tr>
                                <td><label className="col-form-label">OIB:</label></td>
                                <td>{this.props.profile.OIB}</td>
                            </tr>
                        </tbody>
                    </table>
                );
            case 'Student': 
                return (
                    <table className="offset-md-1 col-md-10 offset-md-1">
                        <thead></thead>
                        <tbody>
                            <tr>
                                <td><label className="col-form-label">Ime studenta:</label></td>
                                <td>{this.props.profile.user.name}</td>
                            </tr>
                            <tr>
                                <td><label className="col-form-label">Email adresa:</label></td>
                                <td>{this.props.profile.user.email}</td>
                            </tr>
                            <tr>
                                <td><label className="col-form-label">Broj indeksa:</label></td>
                                <td>{this.props.profile.indexNumber}</td>
                            </tr>
                            <tr>
                                <td><label className="col-form-label">Naziv fakulteta:</label></td>
                                <td>{this.props.profile.faculty}</td>
                            </tr>
                            <tr>
                                <td><label className="col-form-label">Studij:</label></td>
                                <td>{this.props.profile.study}</td>
                            </tr>
                            <tr>
                                <td><label className="col-form-label">Smjer:</label></td>
                                <td>{this.props.profile.course}</td>
                            </tr>
                            <tr>
                                <td><label className="col-form-label">Godina studija:</label></td>
                                <td>{this.props.profile.yearsOfStudy}</td>
                            </tr>
                            <tr>
                                <td><label className="col-form-label">OIB:</label></td>
                                <td>{this.props.profile.OIB}</td>
                            </tr>
                        </tbody>
                    </table>
                ); 
            default: return null;   
        }
    }
}
export default ProfileList;