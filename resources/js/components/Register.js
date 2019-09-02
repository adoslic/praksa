import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Navigation from './Navigation';

class Register extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            email : '',
            role : 'Fakultet',
            number: 1,
            password : '',
            password_confirmation: '',
            errorMessage: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        //console.log(this.state);
        this.setState({
            errorMessage: ''
        })
        if(this.state.name == '' || this.state.email == '' || this.state.password == '' ||
            this.state.password_confirmation == '' || this.state.number == ''){
                this.setState({
                    errorMessage: 'popunite sva polja'
                })
        }
        else{
            if(this.state.password.length > 7 && this.state.password_confirmation == this.state.password){

                if((this.state.role == 'Tvrtka' && this.state.number == 2) ||
                    (this.state.role == 'Fakultet' && this.state.number == 1)){
                        //console.log('Good number');
                    axios.post('/api/register',{
                        name: this.state.name,
                        email: this.state.email,
                        role: this.state.role,
                        password: this.state.password,
                        password_confirmation: this.state.password_confirmation
                    }).then(response =>{
                        //console.log(response);
                        this.setState({
                            errorMessage: ''
                        })
                        this.props.history.push('/login');
                        //console.log(response);
                    }).catch(error =>{
                        
                        //console.log(error.message);
                        this.setState({
                            errorMessage: 'postoji korisnik s tom email adresom'
                        })
                    })
                }
                else{
                    //console.log('Wrong number');
                    this.setState({
                        errorMessage: 'pogrešan broj unesen'
                    })
                }
            }
            else{
                this.setState({
                    errorMessage: 'lozinka mora sadržavati barem 8 znakova te podudrati se'
                })
            }

        }
    }
    handleChange(e){
        this.setState({ [e.target.name]: e.target.value });
        //console.log(this.state);
        // this.setState({
        //     errorMessage: ''
        // })
    }
    render() {
        return (
            <div className="container">
                <Navigation/>
                
                    <form className="form offset-md-2 col-md-8 offset-md-2" onSubmit={this.handleSubmit}>
                        
                        <h3>Registracija</h3>
                        <div className="row">
                            <div className="form-group col">
                            <label className="col-form-label">
                                Ime: 
                            </label>
                                <input 
                                    type="name" 
                                    name="name" 
                                    placeholder="Upišite ime"
                                    className="form-control"
                                    value={this.state.name}
                                    onChange={this.handleChange}/>
                            </div>
                            <div className="form-group col">
                                <label className="col-form-label">
                                    Email adresa: 
                                </label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    placeholder="Upišite email adresu"
                                    className="form-control"
                                    value={this.state.email}
                                    onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-2">
                                <label className="form-check-label">
                                    Uloga:
                                </label>
                            </div>
                            <div className="col-md-4">    
                                <div className="form-group">
                                    <input 
                                        type="radio" 
                                        name="role" 
                                        value="Fakultet"
                                        className="form-check-input"
                                        checked={this.state.role === 'Fakultet'}
                                        onChange={this.handleChange}/>
                                        <label className="form-check-label">
                                            Fakultet
                                        </label>
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="radio" 
                                        name="role" 
                                        value="Tvrtka"
                                        className="form-check-input"
                                        checked={this.state.role === 'Tvrtka'}
                                        onChange={this.handleChange}/>
                                    <label className="form-check-label">
                                        Tvrtka
                                    </label>
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <label className="form-check-label">
                                    Broj uloge: 
                                </label>
                                <input 
                                    type="number" 
                                    name="number" 
                                    className="form-control"
                                    value={this.state.number}
                                    onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col">
                                <label className="form-check-label">
                                    Lozinka: 
                                </label>
                                <input 
                                    type="password" 
                                    name="password"
                                    autoComplete="on"
                                    placeholder="Upišite lozinku"
                                    className="form-control"
                                    value={this.state.password}
                                    onChange={this.handleChange}/>
                            </div>
                            <div className="form-group col">
                                <label className="form-check-label">
                                    Potvrdite lozinku: 
                                </label>
                                <input 
                                    type="password" 
                                    name="password_confirmation"
                                    autoComplete="on"
                                    placeholder="Potvrdite lozinku"
                                    className="form-control"
                                    value={this.state.password_confirmation}
                                    onChange={this.handleChange}/>
                            </div>    
                        </div>
                        <button type="submit" className="btn btn-primary">Registracija</button>

                        <div>{this.state.errorMessage}</div>
                    </form>
                
            </div>
        );
    }
}
export default Register;