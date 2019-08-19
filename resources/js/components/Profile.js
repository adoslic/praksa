import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MainNavigation from './MainNavigation';
import axios from 'axios';
import ProfileList from './ProfileList';
import ProfileInput from './ProfileInput'

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
            address: '',
            phone: '',
            email: '',
            OIB: '',
            
            //lastName: '',
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
        this.handleUpdate = this.handleUpdate.bind(this);
        this.reloadProfile = this.reloadProfile.bind(this);
        this.changeState = this.changeState.bind(this);
    }
    componentDidMount(){
        axios.get('/api/profile')
            .then(response =>{
                //console.log(response.data);
                this.setState({
                    profile: response.data[0],
                    //userInfo: response.data[1],
                    showProfile: true
                })
                if(this.state.profile != undefined)
                    this.setState({
                        id: this.state.profile.id
                    })
                //console.log(this.state.profile);
                //console.log(this.state.userInfo);
            }).catch(error =>{
                console.log(error);
            })
    }
    reloadProfile(){
        axios.get('/api/profile')
            .then(response =>{
                //console.log(response);
                this.setState({
                    profile: response.data[0],
                    //userInfo: response.data[1],
                    showProfile: true
                })
                if(this.state.profile != undefined)
                    this.setState({
                        id: this.state.profile.id
                    })
                //console.log(this.state.id);
                //console.log(this.state.userInfo);
            }).catch(error =>{
                console.log(error);
            })
    }
    handleEdit(){
        //console.log('edit');
        this.setState({
            showCreate: false,
            showProfile: false
        })
        axios.get('/api/profile/'+this.state.id+'/edit')
            .then(response =>{
                //console.log(response.data);
                this.setState({
                    //userEdit: response.data[0],
                    editProfile: response.data[0],
                    
                    showEdit: true,
                    //id: editProfile.id,
                })
                // this.setState({
                //     name: this.state.userEdit.name,
                //     email: this.state.userEdit.email,
                // })
                //console.log(this.state.editProfile);
                //console.log(this.state.userEdit);
                
                if(this.state.userRole == 'Fakultet'){
                        this.setState({
                            id: this.state.editProfile.id,
                            name: this.state.editProfile.user.name,
                            university: this.state.editProfile.university,
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
                            //lastName: this.state.editProfile.lastName,
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
                //console.log(response);
                this.setState({
                    createProfile: response.data,
                    showCreate: true
                })
                //console.log(this.state.createProfile);
            }).catch(error =>{
                console.log(error);
            })
    }
    handleSubmit(e){
        e.preventDefault();
        this.setState({
            errorMessage: ''
        })
        //console.log('submit');
            if(this.state.userRole=='Fakultet'){
                if(this.state.university == '' || this.state.address == '' ||
                    this.state.phone == '' || this.state.OIB == ''){
                    this.setState({
                        errorMessage: 'popunite sva polja'
                    })
                    //console.log(this.state.university);
                }
                else{
                    if(this.state.OIB.length<11){
                        this.setState({
                            errorMessage: 'OIB mora sadržavati 11 znakova'
                        })
                    }
                    else{
                        //console.log(this.state);
                        axios.post('/api/profile',{
                            
                            //name: this.state.name,
                            university: this.state.university,
                            address: this.state.address,
                            phone: this.state.phone,
                            //email: this.state.email,
                            OIB: this.state.OIB
                        }).then(response =>{
                            //console.log(response.data);
                            this.setState({
                                showCreate: false,
                                showProfile: true
                            });
                            this.reloadProfile();
                            //this.props.history.push('/profile');
                            //console.log(response);
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
                        errorMessage: 'popunite sva polja'
                    })
                }
                else{
                    if(this.state.OIB.length<11){
                        this.setState({
                            errorMessage: 'OIB mora sadržavati 11 znakova'
                        })
                    }
                    else{
                        axios.post('/api/profile',{
                            //name: this.state.name,
                            //lastName: this.state.lastName,
                            //email: this.state.email,
                            indexNumber: this.state.indexNumber,
                            faculty: this.state.faculty,
                            study: this.state.study,
                            course: this.state.course,
                            yearsOfStudy: this.state.yearsOfStudy,
                            OIB: this.state.OIB
                        }).then(response =>{
                            //console.log(response);
                            this.setState({
                                showCreate: false,
                                showProfile: true
                            });
                            this.reloadProfile();
                            //this.props.history.push('/profile');
                            //console.log(response);
                        }).catch(error =>{
                            console.log(error);
                        })
                    }
                }
            }
            else if(this.state.userRole == 'Tvrtka'){
                if(this.state.address == '' || this.state.phone == '' || this.state.OIB == ''){
                    this.setState({
                        errorMessage: 'popunite sva polja'
                    })
                }
                else{
                    if(this.state.OIB.length<11){
                        this.setState({
                            errorMessage: 'OIB mora sadržavati 11 znakova'
                        })
                    }
                    else{
                        axios.post('/api/profile',{
                            
                            //name: this.state.name,
                            address: this.state.address,
                            phone: this.state.phone,
                            //email: this.state.email,
                            OIB: this.state.OIB
                        }).then(response =>{
                            //console.log(response);
                            this.setState({
                                showCreate: false,
                                showProfile: true
                            });
                            this.reloadProfile();
                            //this.props.history.push('/profile');
                            //console.log(response);
                        }).catch(error =>{
                            console.log(error);
                        })
                    }
                }
            }
        
    }

    handleUpdate(e){
        e.preventDefault();
        this.setState({
            errorMessage: ''
        })
        if(this.state.userRole=='Fakultet'){
            if(this.state.name == '' || this.state.university == '' || this.state.address == '' ||
                this.state.phone == '' || this.state.email == '' || this.state.OIB == ''){
                    this.setState({
                        errorMessage: 'popunite sva polja'
                    })
                }
            else{
                if(this.state.OIB.length<11){
                    this.setState({
                        errorMessage: 'OIB mora sadržavati 11 znakova'
                    })
                }
                else{
                    //console.log('updated');
                    //console.log(this.state);
                    axios.post('/api/profile/'+this.state.id,{
                        _method : 'PUT',
                        name: this.state.name,
                        university: this.state.university,
                        address: this.state.address,
                        phone: this.state.phone,
                        email: this.state.email,
                        OIB: this.state.OIB
                    }).then(response =>{
                        //console.log(response);
                        this.setState({
                            showEdit: false,
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
            if(this.state.name == '' || this.state.email == '' ||
            this.state.indexNumber == '' || this.state.faculty == '' || this.state.study == '' ||
            this.state.course == '' || this.state.yearsOfStudy == '' || this.state.OIB == ''){
                this.setState({
                    errorMessage: 'popunite sva polja'
                })
                
            }
            else{
                if(this.state.OIB.length<11){
                    this.setState({
                        errorMessage: 'OIB mora sadržavati 11 znakova'
                    })
                }
                else{   
                    axios.post('/api/profile/'+this.state.id,{
                        _method : 'PUT',
                        name: this.state.name,
                        //lastName: this.state.lastName,
                        email: this.state.email,
                        indexNumber: this.state.indexNumber,
                        faculty: this.state.faculty,
                        study: this.state.study,
                        course: this.state.course,
                        yearsOfStudy: this.state.yearsOfStudy,
                        OIB: this.state.OIB
                    }).then(response =>{
                        //console.log(response);
                        this.setState({
                            showEdit: false,
                            showProfile: true
                        });
                        this.reloadProfile();
                        //this.props.history.push('/profile');
                        //console.log(response);
                    }).catch(error =>{
                        console.log(error);
                    })
                }
            }
        }
        else if(this.state.userRole == 'Tvrtka'){
            if(this.state.name == '' ||  this.state.address == '' ||
                this.state.phone == '' || this.state.email == '' || this.state.OIB == ''){
                    this.setState({
                        errorMessage: 'popunite sva polja'
                    })
            }
            else{
                if(this.state.OIB.length<11){
                    this.setState({
                        errorMessage: 'OIB mora sadržavati 11 znakova'
                    })
                }
                else{
                    axios.post('/api/profile/'+this.state.id,{
                        _method : 'PUT',
                        name: this.state.name,
                        address: this.state.address,
                        phone: this.state.phone,
                        email: this.state.email,
                        OIB: this.state.OIB
                    }).then(response =>{
                        //console.log(response);
                        this.setState({
                            showEdit: false,
                            showProfile: true
                        });
                        this.reloadProfile();
                        //this.props.history.push('/profile');
                        //console.log(response);
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
        //console.log(this.state);
        //this.setState({value: event.target.value});
    }

    render() {
        return (
            <div>
                Profile
                
                {(this.state.userRole != null)?
                    <MainNavigation role={this.state.userRole}/>
                    :null
                }

                {this.state.showProfile?
                    (this.state.profile !=undefined)?
                    <div>
                        <ProfileList profile={this.state.profile}/>
                        <button onClick={this.handleEdit}>Uredi</button>
                    </div>
                    : 
                    <button onClick={this.handleCreate}>Kreirajte profil</button>
                :null    
                }

                {/* ovo radi za fakultet
                napravi za ostale
                napravi buttone za delete i edit... */}
                {this.state.showCreate?
                    (this.state.createProfile != [] )?
                        <form>
                            {this.state.createProfile.map((key, index) =>
                                (key != 'id' && key != 'created_at' && key != 'updated_at' && key != 'user_id')?
                                
                                    <input 
                                        key={index}
                                        name={key}
                                        // value={this.state.profileValue[index]}
                                        value={this.state.key}
                                        onChange={this.handleChange}
                                        placeholder={key}/>
                                
                                :null
                            )}
                            {/* {this.state.showCreate? */}
                                <button onClick={this.handleSubmit}>Pošalji</button>
                                <div>{this.state.errorMessage}</div>
                            {/* :null} */}
                        </form>
                    :null
                :null
                }

                {this.state.showEdit?
                    <ProfileInput profile={this.state.editProfile} changeState={this.changeState}/>
                :null
                }
                
                

            </div>
        );
    }
}
export default Profile;