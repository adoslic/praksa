import React, { Component } from 'react';
import axios from 'axios';
import Navigation from './Navigation';
import { Button } from 'reactstrap';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            accessToken: localStorage.getItem('access_token') || null,
            errorMessage: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        this.setState({
            errorMessage: ''
        })
        if(this.state.username == '' || this.state.password == '' ){
            this.setState({
                errorMessage: 'Ispunite sva polja'
            })
        }
        else if(this.state.password.length < 8){
            this.setState({
                errorMessage: 'Lozinka mora biti barem 8 znakova duga'
            })
        }
        else{
            
                axios.post('/api/login',{
                    username: this.state.username,
                    password: this.state.password,
                }).then(response =>{
                    const token = response.data.access_token;
                    localStorage.setItem('access_token', token);
                    this.setState({
                        accessToken: token,
                        errorMessage: ''
                    })
                    this.props.history.push('/main');
                }).catch(error =>{
                    console.log(error);
                    this.setState({
                        errorMessage: 'Neispravni podaci'
                    })
                })
            
        }
    }
    handleChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        return (
            <div className="container">
                <Navigation/>
                <form className="form offset-md-4 col-md-4 offset-md-4" onSubmit={this.handleSubmit}>
                    <h3>Prijava</h3>
                    <div className="form-group">
                        <label className="col-form-label">
                            Email adresa: 
                        </label>
                        <input 
                            type="email" 
                            name="username" 
                            placeholder="Upišite email adresu"
                            className="form-control"
                            value={this.state.username}
                            onChange={this.handleChange}/>
                        </div>
                    <div className="form-group">
                        <label className="col-form-label">
                            Lozinka: 
                        </label>
                        <input 
                            type="password" 
                            name="password"
                            autoComplete="on"
                            className="form-control"
                            placeholder="Upišite lozinku"
                            value={this.state.password}
                            onChange={this.handleChange}/>
                    </div>

                    <Button type="submit" color="primary">Prijava</Button>
                    <div className="text-danger">{this.state.errorMessage}</div>
                </form>
            </div>
        );
    }
}
export default Login;