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
            <div>
                <Navigation/>
                
                <form onSubmit={this.handleSubmit}>
                    
                    <h3>Sign in</h3>
                    <input 
                        type="name" 
                        name="name" 
                        placeholder="enter your name" 
                        value={this.state.name}
                        onChange={this.handleChange}/>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="enter your email" 
                        value={this.state.email}
                        onChange={this.handleChange}/>

                            <input 
                                type="radio" 
                                name="role" 
                                value="Fakultet" 
                                checked={this.state.role === 'Fakultet'}
                                onChange={this.handleChange}/>Fakultet
                            <input 
                                type="radio" 
                                name="role" 
                                value="Tvrtka" 
                                checked={this.state.role === 'Tvrtka'}
                                onChange={this.handleChange}/>Tvrtka
                        
                    <input 
                        type="number" 
                        name="number" 
                        //placeholder="enter number" 
                        value={this.state.number}
                        onChange={this.handleChange}/>
                        
                    <input 
                        type="password" 
                        name="password"
                        autoComplete="on"
                        placeholder="enter password" 
                        value={this.state.password}
                        onChange={this.handleChange}/>
                    <input 
                        type="password" 
                        name="password_confirmation"
                        autoComplete="on"
                        placeholder="enter password again" 
                        value={this.state.password_confirmation}
                        onChange={this.handleChange}/>    

                    <button type="submit">Register</button>

                    <div>{this.state.errorMessage}</div>
                </form>
            </div>
        );
    }
}
export default Register;