import React, { Component } from 'react';

class Logout extends Component {
    constructor(props){
        super(props);

        this.state = {
            accessToken: localStorage.getItem('access_token') || null
        };
    }
    componentDidMount(){
        //console.log('error');
            //provjeri da li je korisnik prijavljen?

            //if(this.state.accessToken!=null){
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.state.accessToken;
                axios.post('/api/logout')
                    .then(response =>{
                    localStorage.clear();
                    //localStorage.removeItem('access_token');
                    this.setState({
                        accessToken: null
                    })
                    this.props.history.push('/');
                    //console.log(response);
                }).catch(error =>{
                    localStorage.clear();
                    this.setState({
                        accessToken: null
                    })
                    
                    console.log(error);
                });
            //}
            
    }
    render(){
        return(
            null
        )
    }
}
export default Logout;
