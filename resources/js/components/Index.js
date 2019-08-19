import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Navigation from './Navigation';
import Main from './Main';
import Logout from './Logout';
import Students from './Students';
import Practice from './Practice';
import Profile from './Profile';
//import history from '../history';

class Index extends Component {
    constructor(props){
        super(props);

        this.state = {
            accessToken: localStorage.getItem('access_token') || null
        };
    }
    userLoggedIn(){
        if (this.state.accessToken != null) {
            return <Redirect to='/main' />
        }
    }

    render() {
        return (
            <Router>
                {this.userLoggedIn()}
                
                <Route path='/' component={Home} exact/>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
                <Route path='/main' component={Main}/>
                <Route path='/logout' component={Logout}/>
                <Route path='/students' component={Students}/>
                <Route path='/practice' component={Practice}/>
                <Route path='/profile' component={Profile}/>
                {/* <Route render={() => <Redirect to="/" />} /> */}
            </Router>
        );
    }
}
export default Index;

if (document.getElementById('example')) {
    ReactDOM.render(<Index />, document.getElementById('example'));
}