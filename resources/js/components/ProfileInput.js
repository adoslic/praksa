import React, { Component } from 'react';
import { Button, Label, Form, FormGroup, Col, Input } from 'reactstrap';

class ProfileInput extends Component {
    constructor(props){
        super(props);

        this.state = {
            userRole: localStorage.getItem('role'),
            id: this.props.profile.id,
            name: this.props.profile.user.name,
            university: this.props.profile.university,
            courses: this.props.profile.courses,
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
    componentDidMount(){
        if(this.state.userRole == 'Fakultet'){
            this.setState({
                courses: this.state.courses.join(", ")
            })
        }
    }
    handleChange(event){
        this.setState({ [event.target.name] : event.target.value });
    }
    handleUpdate(e){
        e.preventDefault();
        this.setState({
            errorMessage: ''
        })
        if(this.state.userRole=='Fakultet'){
            if(this.state.name == '' || this.state.university == '' || 
                this.state.courses == '' || this.state.address == '' ||
                this.state.phone == '' || this.state.email == '' || this.state.OIB == ''){
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
                    axios.post('/api/profile/'+this.state.id,{
                        _method : 'PUT',
                        name: this.state.name,
                        university: this.state.university,
                        courses: this.state.courses.split(","),
                        address: this.state.address,
                        phone: this.state.phone,
                        email: this.state.email,
                        OIB: this.state.OIB
                    }).then(response =>{
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
                    axios.post('/api/profile/'+this.state.id,{
                        _method : 'PUT',
                        name: this.state.name,
                        email: this.state.email,
                        indexNumber: this.state.indexNumber,
                        faculty: this.state.faculty,
                        study: this.state.study,
                        course: this.state.course,
                        yearsOfStudy: this.state.yearsOfStudy,
                        OIB: this.state.OIB
                    }).then(response =>{
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
                    axios.post('/api/profile/'+this.state.id,{
                        _method : 'PUT',
                        name: this.state.name,
                        address: this.state.address,
                        phone: this.state.phone,
                        email: this.state.email,
                        OIB: this.state.OIB
                    }).then(response =>{
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
                <Form>
                    <FormGroup row>
                        <Label sm={5}>Naziv tvrtke</Label>
                        <Col sm={7}>
                            <Input 
                                type="textarea"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={5}>Adresa</Label>
                        <Col sm={7}>
                            <Input 
                                type="text" 
                                name="address"
                                value={this.state.address}
                                onChange={this.handleChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={5}>Telefon</Label>
                        <Col sm={7}>
                            <Input 
                                type="text" 
                                name="phone"
                                value={this.state.phone}
                                onChange={this.handleChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={5}>Email adresa</Label>
                        <Col sm={7}>
                            <Input 
                                type="text" 
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={5}>OIB</Label>
                        <Col sm={7}>
                            <Input 
                                type="text" 
                                name="OIB"
                                value={this.state.OIB}
                                onChange={this.handleChange}/>
                        </Col>
                    </FormGroup>
                    <Button color="primary" onClick={this.handleUpdate}>Spremi</Button>
                    <div className="text-danger">{this.state.errorMessage}</div>
                </Form>
            );
            case 'Fakultet': 
                return (
                    <Form>
                        <FormGroup row>
                            <Label sm={5}>Naziv sveučilišta</Label>
                            <Col sm={7}>
                                <Input 
                                    type="textarea"
                                    name="university"
                                    value={this.state.university}
                                    onChange={this.handleChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={5}>Naziv fakulteta</Label>
                            <Col sm={7}>
                                <Input 
                                    type="textarea"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={5}>Smjerovi fakulteta</Label>
                            <Col sm={7}>
                                <Input 
                                    type="textarea"
                                    rows="4"
                                    name="courses"
                                    value={this.state.courses}
                                    onChange={this.handleChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={5}>Adresa</Label>
                            <Col sm={7}>
                                <Input 
                                    type="text" 
                                    name="address"
                                    value={this.state.address}
                                    onChange={this.handleChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={5}>Telefon</Label>
                            <Col sm={7}>
                                <Input 
                                    type="text" 
                                    name="phone"
                                    value={this.state.phone}
                                    onChange={this.handleChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={5}>Email adresa</Label>
                            <Col sm={7}>
                                <Input 
                                    type="text" 
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={5}>OIB</Label>
                            <Col sm={7}>
                                <Input 
                                    type="text" 
                                    name="OIB"
                                    value={this.state.OIB}
                                    onChange={this.handleChange}/>
                            </Col>
                        </FormGroup>
                        <Button color="primary" onClick={this.handleUpdate}>Spremi</Button>
                        <div className="text-danger">{this.state.errorMessage}</div>
                    </Form>
                );
            case 'Student': 
                return (
                    <Form>
                        <FormGroup row>
                            <Label sm={5}>Ime i prezime</Label>
                            <Col sm={7}>
                                <Input 
                                    type="text" 
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={5}>Email adresa</Label>
                            <Col sm={7}>
                                <Input 
                                    name='email'
                                    type='email'
                                    value={this.state.email}
                                    onChange={this.handleChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={5}>Broj indeksa</Label>
                            <Col sm={7}>
                                <Input 
                                    name='indexNumber'
                                    type='text'
                                    readOnly="readonly"
                                    value={this.state.indexNumber}
                                    onChange={this.handleChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={5}>Naziv fakulteta</Label>
                            <Col sm={7}>
                                <Input 
                                    name='faculty'
                                    type='text'
                                    readOnly="readonly"
                                    value={this.state.faculty}
                                    onChange={this.handleChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={5}>Studij</Label>
                            <Col sm={7}>
                                <Input 
                                    name='study'
                                    type='text'
                                    readOnly="readonly"
                                    value={this.state.study}
                                    onChange={this.handleChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={5}>Smjer</Label>
                            <Col sm={7}>
                                <Input 
                                    name='course'
                                    type='text'
                                    readOnly="readonly"
                                    value={this.state.course}
                                    onChange={this.handleChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={5}>Godina studija</Label>
                            <Col sm={7}>
                                <Input 
                                    name='yearsOfStudy'
                                    type='text'
                                    readOnly="readonly"
                                    value={this.state.yearsOfStudy}
                                    onChange={this.handleChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={5}>OIB</Label>
                            <Col sm={7}>
                                <Input 
                                    type="text" 
                                    name="OIB"
                                    value={this.state.OIB}
                                    onChange={this.handleChange}/>
                            </Col>
                        </FormGroup>
                        <Button color="primary" onClick={this.handleUpdate}>Spremi</Button>
                        <div className="text-danger">{this.state.errorMessage}</div>
                    </Form>
                ); 
            default: return null;   
        }
        
    }
}
export default ProfileInput;