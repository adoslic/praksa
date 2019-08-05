import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, NavLink } from 'react-router-dom';
import Login from './Login';
import Logout from './Logout';
import MainNavigation from './MainNavigation';

class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: [],
            accessToken: localStorage.getItem('access_token') || null
        };
    }
    componentDidMount(){
        //console.log(this.state);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.state.accessToken;
        axios.get('/api/user')
            .then(response =>{
            //console.log(response.data);
            this.setState({
                user: response.data
            })
        })
        // .then(response =>{
        //     console.log(this.state.user);
        // })
        .catch(error =>{
            console.log(error);
        })
    }

    render() {
        
            return (
                <div>
                    <MainNavigation role={this.state.user.role}/>
                    <h1>{this.state.user.id}</h1>
                </div>
            );
    }
}
export default Main;
