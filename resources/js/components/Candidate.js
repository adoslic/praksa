import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MainNavigation from './MainNavigation';
import axios from 'axios';
import ProfileList from './ProfileList';
import ProfileInput from './ProfileInput'

class Candidate extends Component {
    constructor(props){
        super(props);
        this.state = {
            profile: [],
            showProfile: false,
            candidate: []
        }
        this.hideProfile = this.hideProfile.bind(this);
        //this.acceptApplication = this.acceptApplication.bind(this);
    }
    componentDidMount(){
        //console.log(this.props);
    }
    showProfile(id){
        //console.log(id);
        axios.get('/api/profile/'+id)
            .then(response =>{
                //console.log(response);
                this.setState({
                    profile: response.data[0],
                    showProfile: true
                })
                //console.log(this.state.profile);
            }).catch(error =>{
                console.log(error);
            })
    }
    hideProfile(){
        //console.log('hide');
        this.setState({
            showProfile: false
        })
    }
    acceptApplication(id){
        //console.log(id);
        let array = [];
        var obj = {
                id: this.props.candidate.id,
                name: this.props.candidate.name,
                email: this.props.candidate.email
            };
        array.push(obj);

        axios.post('/api/practise/'+id,{
                    _method : 'PUT',
                    candidates: array,
                }).then(response =>{
                    console.log(response);
                    this.props.handleBack();
                    //this.acceptApplication.bind(this)
                    //this.handleBack();
                }).catch(error =>{
                    console.log(error);
                })
    }
    render() {
        return (
                <li>{this.props.candidate.name}
                    {!this.state.showProfile?
                        <button onClick={this.showProfile.bind(this, this.props.candidate.id)}>Show profile</button>
                    :<div>
                        <ProfileList profile={this.state.profile}/>
                        <button onClick={this.hideProfile}>Hide profile</button>
                        
                    </div>
                    }
                    {(this.props.status != 'free')?
                    null
                    :<button onClick={this.acceptApplication.bind(this, this.props.id)}>Accept application</button>
                    }
                    
                </li>
        )
    }
    
}
export default Candidate;