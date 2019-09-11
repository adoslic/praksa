import React, { Component } from 'react';
import MainNavigation from './MainNavigation';
import axios from 'axios';
import ProfileList from './ProfileList';
import ProfileInput from './ProfileInput';
import { Button } from 'reactstrap';
class Profile extends Component {
    constructor(){
        super();
        this.state = {
            userRole: localStorage.getItem('role'),
            profile: [],
            userInfo: [],
            role: '',
            createProfile: [],
            profileValue: [],
            editProfile: [],
            userEdit: [],
            showProfile: false,
            showCreate: false,
            showEdit: false,

            id: '',
            name: '',
            university: '',
            courses: '',
            address: '',
            phone: '',
            email: '',
            OIB: '',
            
            indexNumber: '',
            faculty: '',
            study: '',
            course: '',
            yearsOfStudy: '',

            errorMessage: ''
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.reloadProfile = this.reloadProfile.bind(this);
        this.changeState = this.changeState.bind(this);
    }
    componentDidMount(){
        this.reloadProfile();
    }
    reloadProfile(){
        axios.get('/api/profile')
            .then(response =>{
                this.setState({
                    profile: response.data[0],
                    showProfile: true
                })
                if(this.state.profile != undefined){
                    this.setState({
                        id: this.state.profile.id
                    })
                }
                else{
                    this.handleCreate();
                }
            }).catch(error =>{
                console.log(error);
            })
    }
    handleEdit(){
        this.setState({
            showCreate: false,
            showProfile: false
        })
        axios.get('/api/profile/'+this.state.id+'/edit')
            .then(response =>{
                this.setState({
                    editProfile: response.data[0],
                    showEdit: true,
                })
                if(this.state.userRole == 'Fakultet'){
                        this.setState({
                            id: this.state.editProfile.id,
                            name: this.state.editProfile.user.name,
                            university: this.state.editProfile.university,
                            courses: this.state.editProfile.courses.join(),
                            address: this.state.editProfile.address,
                            phone: this.state.editProfile.phone,
                            email: this.state.editProfile.user.email,
                            OIB: this.state.editProfile.OIB
                        })
                }
                else if(this.state.userRole == 'Student'){
                        this.setState({
                            id: this.state.editProfile.id,
                            name: this.state.editProfile.user.name,
                            email: this.state.editProfile.user.email,
                            indexNumber: this.state.editProfile.indexNumber,
                            faculty: this.state.editProfile.faculty,
                            study: this.state.editProfile.study,
                            course: this.state.editProfile.course,
                            yearsOfStudy: this.state.editProfile.yearsOfStudy,
                            OIB: this.state.editProfile.OIB
                        })
                }        
                else if(this.state.userRole == 'Tvrtka'){
                        this.setState({
                            id: this.state.editProfile.id,
                            name: this.state.editProfile.user.name,
                            address: this.state.editProfile.address,
                            phone: this.state.editProfile.phone,
                            email: this.state.editProfile.user.email,
                            OIB: this.state.editProfile.OIB
                        })
                }
            }).catch(error =>{
                console.log(error);
            })
    }
    handleCreate(){
        this.setState({
            showProfile: false,
            showEdit: false
        })
        axios.get('/api/profile/create')
            .then(response =>{
                this.setState({
                    createProfile: response.data,
                    showCreate: true
                })
            }).catch(error =>{
                console.log(error);
            })
    }
    handleSubmit(e){
        e.preventDefault();
        this.setState({
            errorMessage: ''
        })
            if(this.state.userRole=='Fakultet'){
                if(this.state.university == '' || this.state.address == '' ||
                    this.state.courses == '' ||
                    this.state.phone == '' || this.state.OIB == ''){
                    this.setState({
                        errorMessage: 'Ispunite sva polja'
                    })
                }
                else{
                    if(this.state.OIB.length != 11){
                        this.setState({
                            errorMessage: 'OIB mora sadržavati 11 znakova'
                        })
                    }
                    else{
                        axios.post('/api/profile',{
                            university: this.state.university,
                            address: this.state.address,
                            courses: this.state.courses.split(","),
                            phone: this.state.phone,
                            OIB: this.state.OIB
                        }).then(response =>{
                            this.setState({
                                showCreate: false,
                                showProfile: true
                            });
                            this.reloadProfile();
                            
                        }).catch(error =>{
                            console.log(error);
                        })
                    }
                }
            }
            else if(this.state.userRole == 'Student'){
                if(this.state.indexNumber == '' || 
                this.state.faculty == '' || this.state.study == '' ||
                this.state.course == '' || this.state.yearsOfStudy == '' || this.state.OIB == ''){
                    this.setState({
                        errorMessage: 'Ispunite sva polja'
                    })
                }
                else{
                    if(this.state.OIB.length != 11){
                        this.setState({
                            errorMessage: 'OIB mora sadržavati 11 znakova'
                        })
                    }
                    else{
                        axios.post('/api/profile',{
                            
                            indexNumber: this.state.indexNumber,
                            faculty: this.state.faculty,
                            study: this.state.study,
                            course: this.state.course,
                            yearsOfStudy: this.state.yearsOfStudy,
                            OIB: this.state.OIB
                        }).then(response =>{
                            this.setState({
                                showCreate: false,
                                showProfile: true
                            });
                            this.reloadProfile();
                            
                        }).catch(error =>{
                            console.log(error);
                        })
                    }
                }
            }
            else if(this.state.userRole == 'Tvrtka'){
                if(this.state.address == '' || this.state.phone == '' || this.state.OIB == ''){
                    this.setState({
                        errorMessage: 'Ispunite sva polja'
                    })
                }
                else{
                    if(this.state.OIB.length != 11){
                        this.setState({
                            errorMessage: 'OIB mora sadržavati 11 znakova'
                        })
                    }
                    else{
                        axios.post('/api/profile',{
                            address: this.state.address,
                            phone: this.state.phone,
                            OIB: this.state.OIB
                        }).then(response =>{
                            this.setState({
                                showCreate: false,
                                showProfile: true
                            });
                            this.reloadProfile();
                        }).catch(error =>{
                            console.log(error);
                        })
                    }
                }
            }
    }
    changeState () {
        this.setState({
            showEdit: false,
            showProfile: true
        });
        this.reloadProfile();
    };

    handleChange(event){
        this.setState({ [event.target.name] : event.target.value });
    }

    render() {
        return (
            <div className="container">

                {(this.state.userRole != null && this.state.profile != undefined)?
                    <MainNavigation role={this.state.userRole}/>
                    :null
                }
                
                {this.state.showProfile?
                    (this.state.profile !=undefined)?
                    <div className="offset-md-4 col-md-4 offset-md-4">
                        <ProfileList profile={this.state.profile}/>
                        <Button color="primary" className="offset-md-1" onClick={this.handleEdit}>Uredi</Button>
                    </div>
                    :null
                :null    
                }

                {this.state.showCreate?
                    (this.state.createProfile != [] )?
                        <form className="offset-md-4 col-md-4 offset-md-4">
                            {this.state.createProfile.map((key, index) =>
                                (key != 'id' && key != 'created_at' && key != 'updated_at' 
                                && key != 'user_id' && key != 'faculty' && key != 'study' 
                                && key != 'course' && key != 'yearOfStudy' && key != 'indexNumber')?
                                <div key={index} className="form-group">
                                        {key == 'university'? <label className="col-form-label">Sveučilište:</label>
                                        :key == 'courses'? <label className="col-form-label">Smjerovi fakulteta:</label>
                                        :key == 'address'? <label className="col-form-label">Adresa:</label>
                                        :key == 'phone'? <label className="col-form-label">Telefon:</label>
                                        :key == 'OIB'? <label className="col-form-label">OIB:</label>
                                        :null}
                                    <input 
                                        name={key}
                                        className="form-control"
                                        value={this.state.key}
                                        onChange={this.handleChange}/>
                                </div>
                                :null
                            )}
                            <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Pošalji</button>
                                
                            <div className="text-danger">{this.state.errorMessage}</div>
                            
                        </form>
                    :null
                :null
                }
                {this.state.showEdit?
                    <div className="offset-md-3 col-md-6 offset-md-3">
                        <ProfileInput profile={this.state.editProfile} changeState={this.changeState}/>
                    </div>
                :null
                }
            </div>
        );
    }
}
export default Profile;