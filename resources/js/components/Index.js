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
import Practise from './Practise';
import Profile from './Profile';
import MyPractise from './MyPractise';
import ReportList from './ReportList';
import Grades from './Grades';
import 'bootstrap/dist/css/bootstrap.css';

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
                <Route path='/practise' component={Practise}/>
                <Route path='/mypractise' component={MyPractise}/>
                <Route path='/profile' component={Profile}/>
                <Route path='/reports' component={ReportList}/>
                <Route path='/grades' component={Grades}/>
                
            </Router>
        );
    }
}
export default Index;

if (document.getElementById('example')) {
    ReactDOM.render(<Index />, document.getElementById('example'));
}