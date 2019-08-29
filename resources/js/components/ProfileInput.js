import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MainNavigation from './MainNavigation';

class ProfileInput extends Component {
    constructor(props){
        super(props);

        this.state = {
            userRole: localStorage.getItem('role'),
            id: this.props.profile.id,
            name: this.props.profile.user.name,
            university: this.props.profile.university,
            address: this.props.profile.address,
            phone: this.props.profile.phone,
            email: this.props.profile.user.email,
            OIB: this.props.profile.OIB,
            
            
            indexNumber: this.props.profile.indexNumber,
            faculty: this.props.profile.faculty,
            study: this.props.profile.study,
            course: this.props.profile.course,
            yearsOfStudy: this.props.profile.yearsOfStudy,

            errorMessage: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleChange(event){
        this.setState({ [event.target.name] : event.target.value });
        //console.log(this.state);
        //this.setState({value: event.target.value});
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
                        //console.log(response.data);
                        this.props.changeState();
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
                        this.props.changeState();
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
                        this.props.changeState();
                    }).catch(error =>{
                        console.log(error);
                    })
                }
            }
        }    
        
    }

    render() {
        switch(this.props.profile.user.role){
            case 'Tvrtka': 
            return (
                <form onSubmit={this.handleUpdate}>
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
                    <button type='submit'>Spremi</button>
                    <div>{this.state.errorMessage}</div>
                </form>
            );
            case 'Fakultet': 
                return (
                    
                    <form onSubmit={this.handleUpdate}>
                        <div>
                            <label>Naziv sveučilišta: </label> 
                            <input 
                                name='university'
                                type='text'
                                value={this.state.university}
                                onChange={this.handleChange}/>
                        </div>
                        <div>
                            <label>Naziv fakulteta:</label> 
                            <input 
                                name='name'
                                type='text'
                                value={this.state.name}
                                onChange={this.handleChange}/>
                        </div>
                        <div>
                            <label>Adresa:</label> 
                            <input 
                                name='address'
                                type='text'
                                value={this.state.address}
                                onChange={this.handleChange}/>
                        </div>
                        <div>
                            <label>Kontakt: </label> 
                            <input 
                                name='phone'
                                type='text'
                                value={this.state.phone}
                                onChange={this.handleChange}/>
                        </div>
                        <div>
                            <label>Email adresa:</label> 
                            <input 
                                name='email'
                                type='email'
                                value={this.state.email}
                                onChange={this.handleChange}/>
                        </div>
                        <div>
                            <label>OIB: </label> 
                            <input 
                                name='OIB'
                                type='text'
                                value={this.state.OIB}
                                onChange={this.handleChange}/>
                        </div>
                        <button type='submit'>Spremi</button>
                        <div>{this.state.errorMessage}</div>
                    </form>
                );
            case 'Student': 
                return (
                    <form onSubmit={this.handleUpdate}>
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
                            <label>Email adresa:</label> 
                            <input 
                                name='email'
                                type='email'
                                // value={this.state.profileValue[index]}
                                value={this.state.email}
                                onChange={this.handleChange}/>
                        </div>
                        <div>
                            <label>Broj indeksa: {this.state.faculty}</label> 
                            {/* <input 
                                name='indexNumber'
                                type='text'
                                // value={this.state.profileValue[index]}
                                value={this.state.indexNumber}
                                onChange={this.handleChange}/> */}
                        </div>
                        <div>
                            <label>Naziv fakulteta: {this.state.faculty}</label> 
                            {/* <input 
                                name='faculty'
                                type='text'
                                // value={this.state.profileValue[index]}
                                value={this.state.faculty}
                                onChange={this.handleChange}/> */}
                        </div>
                        <div>
                            <label>Studij: {this.state.study}</label> 
                            {/* <input 
                                name='study'
                                type='text'
                                // value={this.state.profileValue[index]}
                                value={this.state.study}
                                onChange={this.handleChange}/> */}
                        </div>
                        <div>
                            <label>Smjer: {this.state.course}</label> 
                            {/* <input 
                                name='course'
                                type='text'
                                // value={this.state.profileValue[index]}
                                value={this.state.course}
                                onChange={this.handleChange}/> */}
                        </div>
                        <div>
                            <label>Godina studija: {this.state.yearsOfStudy}</label> 
                            {/* <input 
                                name='yearsOfStudy'
                                type='text'
                                // value={this.state.profileValue[index]}
                                value={this.state.yearsOfStudy}
                                onChange={this.handleChange}/> */}
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
                        <button type='submit'>Spremi</button>
                        <div>{this.state.errorMessage}</div>
                    </form>
                ); 
            default: return null;   
        }
        
    }
}
export default ProfileInput;