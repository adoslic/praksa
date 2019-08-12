import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MainNavigation from './MainNavigation';
import axios from 'axios';
import ProfileList from './ProfileList';

class Profile extends Component {
    constructor(){
        super();
        this.state = {
            userRole: localStorage.getItem('role'),
            profile: [],
            role: '',
            createProfile: [],
            profileValue: [],
            editProfile: [],
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
            
            lastName: '',
            indexNumber: '',
            faculty: '',
            study: '',
            course: '',
            yearsOfStudy: '',

        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.reloadProfile = this.reloadProfile.bind(this);
    }
    componentDidMount(){
        axios.get('/api/profile')
            .then(response =>{
                //console.log(response);
                this.setState({
                    profile: response.data[0],
                    showProfile: true
                })
                if(this.state.profile != undefined)
                    this.setState({
                        id: this.state.profile.id
                    })
                //console.log(this.state.profile);
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
                    showProfile: true
                })
                if(this.state.profile != undefined)
                    this.setState({
                        id: this.state.profile.id
                    })
                //console.log(this.state.profile);
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
                //console.log(response);
                this.setState({
                    editProfile: response.data,
                    showEdit: true,
                    //id: editProfile.id,
                }) 
                //console.log(this.state.editProfile);
                switch(this.state.userRole){
                    case 'Fakultet':
                        this.setState({
                            id: this.state.editProfile.id,
                            name: this.state.editProfile.name,
                            university: this.state.editProfile.university,
                            address: this.state.editProfile.address,
                            phone: this.state.editProfile.phone,
                            email: this.state.editProfile.email,
                            OIB: this.state.editProfile.OIB
                        })
                    case 'Student':
                        this.setState({
                            id: this.state.editProfile.id,
                            name: this.state.editProfile.name,
                            lastName: this.state.editProfile.lastName,
                            email: this.state.editProfile.email,
                            indexNumber: this.state.editProfile.indexNumber,
                            faculty: this.state.editProfile.faculty,
                            study: this.state.editProfile.study,
                            course: this.state.editProfile.course,
                            yearsOfStudy: this.state.editProfile.yearsOfStudy,
                            OIB: this.state.editProfile.OIB
                        })
                    case 'Tvrtka':
                        this.setState({
                            id: this.state.editProfile.id,
                            name: this.state.editProfile.name,
                            address: this.state.editProfile.address,
                            phone: this.state.editProfile.phone,
                            email: this.state.editProfile.email,
                            OIB: this.state.editProfile.OIB
                        })
                }
                
               
            }).catch(error =>{
                console.log(error);
            })


    }
    handleDelete(){
        console.log('delete');

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
                console.log(this.state.createProfile);
            }).catch(error =>{
                console.log(error);
            })
    }
    handleSubmit(e){
        e.preventDefault();
        //console.log('submit');
        switch(this.state.userRole){
            case 'Fakultet':
                axios.post('/api/profile',{
                    
                    name: this.state.name,
                    university: this.state.university,
                    address: this.state.address,
                    phone: this.state.phone,
                    email: this.state.email,
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
            case 'Student':
                axios.post('/api/profile',{
                    name: this.state.name,
                    lastName: this.state.lastName,
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
                        showCreate: false,
                        showProfile: true
                    });
                    this.reloadProfile();
                    //this.props.history.push('/profile');
                    //console.log(response);
                }).catch(error =>{
                    console.log(error);
                })
            case 'Tvrtka':
                axios.post('/api/profile',{
                    
                    name: this.state.name,
                    address: this.state.address,
                    phone: this.state.phone,
                    email: this.state.email,
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

    handleUpdate(e){
        e.preventDefault();
        switch(this.state.userRole){
            case 'Fakultet':
                
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
                    //this.props.history.push('/profile');
                    //console.log(response);
                }).catch(error =>{
                    console.log(error);
                })
            case 'Student':
                
                axios.post('/api/profile/'+this.state.id,{
                    _method : 'PUT',
                    name: this.state.name,
                    lastName: this.state.lastName,
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
            case 'Tvrtka':
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

    handleChange(e){
        this.setState({ [e.target.name] : e.target.value });
        //console.log(this.state);
    }

    render() {
        return (
            <div>
                Profile
                
                {(this.state.userRole != null)?
                    <MainNavigation role={this.state.userRole}/>
                    :null
                }

                {/* {this.state.showProfile?
                    this.reloadProfile()
                :null
                } */}

                {this.state.showProfile?
                    (this.state.profile !=undefined)?
                    <div>
                        <ProfileList profile={this.state.profile} role={this.state.userRole}/>
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
                                <button onClick={this.handleSubmit}>Submit</button>
                            {/* :null} */}
                        </form>
                    :null
                :null
                }

                {this.state.showEdit?
                    <form>
                        {(this.state.userRole == 'Fakultet')?
                        <div>
                            <div>
                                <label>Naziv fakulteta:</label> 
                                <input 
                                    name='name'
                                    type='text'
                                    // value={this.state.profileValue[index]}
                                    value={this.state.name}
                                    onChange={this.handleChange}/>
                            </div>
                            <div>
                                <label>Naziv sveučilišta: </label> 
                                <input 
                                    name='university'
                                    type='text'
                                    // value={this.state.profileValue[index]}
                                    value={this.state.university}
                                    onChange={this.handleChange}/>
                            </div>
                            <div>
                                <label>Adresa:</label> 
                                <input 
                                    name='address'
                                    type='text'
                                    // value={this.state.profileValue[index]}
                                    value={this.state.address}
                                    onChange={this.handleChange}/>
                            </div>
                            <div>
                                <label>Kontakt: </label> 
                                <input 
                                    name='phone'
                                    type='text'
                                    // value={this.state.profileValue[index]}
                                    value={this.state.phone}
                                    onChange={this.handleChange}/>
                            </div>
                            <div>
                                <label>Email adresa:</label> 
                                <input 
                                    name='email'
                                    type='email'
                                    // value={this.state.profileValue[index]}
                                    value={this.state.email}
                                    onChange={this.handleChange}/>
                            </div>
                            <div>
                                <label>OIB: </label> 
                                <input 
                                    name='OIB'
                                    type='text'
                                    // value={this.state.profileValue[index]}
                                    value={this.state.OIB}
                                    onChange={this.handleChange}/>
                            </div>
                        </div>
                        :(this.state.userRole == 'Student')?
                        <div>
                            <div>
                                <label>Ime studenta</label> 
                                <input 
                                    name='name'
                                    type='text'
                                    // value={this.state.profileValue[index]}
                                    value={this.state.name}
                                    onChange={this.handleChange}/>
                            </div>
                            <div>
                                <label>Prezime studenta: </label> 
                                <input 
                                    name='lastName'
                                    type='text'
                                    // value={this.state.profileValue[index]}
                                    value={this.state.lastName}
                                    onChange={this.handleChange}/>
                            </div>
                            <div>
                                <label>Email adresa:</label> 
                                <input 
                                    name='email'
                                    type='email'
                                    // value={this.state.profileValue[index]}
                                    value={this.state.email}
                                    onChange={this.handleChange}/>
                            </div>
                            <div>
                                <label>Broj indeksa: </label> 
                                <input 
                                    name='indexNumber'
                                    type='text'
                                    // value={this.state.profileValue[index]}
                                    value={this.state.indexNumber}
                                    onChange={this.handleChange}/>
                            </div>
                            <div>
                                <label>Naziv fakulteta:</label> 
                                <input 
                                    name='faculty'
                                    type='text'
                                    // value={this.state.profileValue[index]}
                                    value={this.state.faculty}
                                    onChange={this.handleChange}/>
                            </div>
                            <div>
                                <label>Studij: </label> 
                                <input 
                                    name='study'
                                    type='text'
                                    // value={this.state.profileValue[index]}
                                    value={this.state.study}
                                    onChange={this.handleChange}/>
                            </div>
                            <div>
                                <label>Smjer: </label> 
                                <input 
                                    name='course'
                                    type='text'
                                    // value={this.state.profileValue[index]}
                                    value={this.state.course}
                                    onChange={this.handleChange}/>
                            </div>
                            <div>
                                <label>Godina studija:</label> 
                                <input 
                                    name='yearsOfStudy'
                                    type='text'
                                    // value={this.state.profileValue[index]}
                                    value={this.state.yearsOfStudy}
                                    onChange={this.handleChange}/>
                            </div>
                            <div>
                                <label>OIB: </label> 
                                <input 
                                    name='OIB'
                                    type='text'
                                    // value={this.state.profileValue[index]}
                                    value={this.state.OIB}
                                    onChange={this.handleChange}/>
                            </div>
                        </div>
                        :(this.state.userRole == 'Tvrtka')?
                        <div>
                            <div>
                                <label>Naziv firme:</label> 
                                <input 
                                    name='name'
                                    type='text'
                                    // value={this.state.profileValue[index]}
                                    value={this.state.name}
                                    onChange={this.handleChange}/>
                            </div>
                            <div>
                                <label>Adresa:</label> 
                                <input 
                                    name='address'
                                    type='text'
                                    // value={this.state.profileValue[index]}
                                    value={this.state.address}
                                    onChange={this.handleChange}/>
                            </div>
                            <div>
                                <label>Kontakt: </label> 
                                <input 
                                    name='phone'
                                    type='text'
                                    // value={this.state.profileValue[index]}
                                    value={this.state.phone}
                                    onChange={this.handleChange}/>
                            </div>
                            <div>
                                <label>Email adresa:</label> 
                                <input 
                                    name='email'
                                    type='email'
                                    // value={this.state.profileValue[index]}
                                    value={this.state.email}
                                    onChange={this.handleChange}/>
                            </div>
                            <div>
                                <label>OIB: </label> 
                                <input 
                                    name='OIB'
                                    type='text'
                                    // value={this.state.profileValue[index]}
                                    value={this.state.OIB}
                                    onChange={this.handleChange}/>
                            </div>
                        </div>
                        :null
                        }    
                            <button onClick={this.handleUpdate}>Update</button>
                    </form>
                :null
                }
                
                

            </div>
        );
    }
}
export default Profile;