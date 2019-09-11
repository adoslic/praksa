import React, { Component } from 'react';

class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: [],
            accessToken: localStorage.getItem('access_token') || null,
            
        };
    }
    componentDidMount(){
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.state.accessToken;
        axios.get('/api/user')
            .then(response =>{
            const role = response.data.role;
            this.setState({
                user: response.data,
            })
            localStorage.setItem('role', role);
            
            this.props.history.push('/profile')
            
        })
        .catch(error =>{
            console.log(error);
        })
    }

    render() {
            return null;
    }
}
export default Main;
