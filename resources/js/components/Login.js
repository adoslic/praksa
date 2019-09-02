import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import history from '../history';
import Navigation from './Navigation';

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
        //console.log(this.state);
        if(this.state.username == '' || this.state.password == '' ){
            this.setState({
                errorMessage: 'popunite sva polja'
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
                    //console.log(response);
                }).catch(error =>{
                    console.log(error);
                    this.setState({
                        errorMessage: 'neispravni podaci'
                    })
                })
            
        }    
        //this.props.history.push('/main');
    }
    handleChange(e){
        this.setState({ [e.target.name]: e.target.value });
        //console.log(this.state);
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

                    <button type="submit" className="btn btn-primary">Prijava</button>

                    <div>{this.state.errorMessage}</div>
                </form>
            </div>
        );
    }
}
export default Login;