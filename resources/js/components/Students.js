import React, { Component } from 'react';
import StudentList from './StudentList';
import MainNavigation from './MainNavigation';
import { Button, Label, ListGroup, ListGroupItem, ListGroupItemHeading, 
    Table, Form, FormGroup, Col, Input} from 'reactstrap';

class Students extends Component {
    constructor(){
        super();
        this.state = {
            showForm: false,
            name: '',
            indexNumber: '',
            email : '',
            role : 'Student',
            password : '',
            course: '',
            courses: [],
            study: 'Preddiplomski',
            yearsOfStudy: '',
            userRole: localStorage.getItem('role'),
            students: [],
            id: '',
            errorMessage: '',
            message: '',
            
        }
        this.handleButton = this.handleButton.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.refreshStudents = this.refreshStudents.bind(this);
    }
    handleButton(){
        this.setState(prevState => ({
            showForm: !prevState.showForm
        }));
        this.setState({
            name: '',
            indexNumber: '',
            email: '',
            study: 'Preddiplomski',
            course: '',
            yearsOfStudy: '',
            password: ''
        })
    }
    handleChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSubmit(e){
        e.preventDefault();
        this.setState({
            errorMessage: ''
        })
        
        if(this.state.name == '' || this.state.indexNumber == '' || this.state.study == '' ||
            this.state.course == '' || this.state.yearsOfStudy == '' ||
            this.state.email == '' || this.state.password == ''){
                this.setState({
                    errorMessage: 'Ispunite sva polja'
                })
        }
        else{
            if(this.state.password.length < 8){
                this.setState({
                    errorMessage: 'Lozinka mora sadržavati barem 8 znakova'
                })
            }
            else if(isNaN(this.state.indexNumber) || this.state.indexNumber.length != 10){
                this.setState({
                    errorMessage: 'Neispravan broj indeksa'
                })
            }
            else if(isNaN(this.state.yearsOfStudy) || this.state.yearsOfStudy.length > 1){
                this.setState({
                    errorMessage: 'Neispravna godina studiranja'
                })
            }
            else{
                axios.post('/api/register',{
                    name: this.state.name,
                    email: this.state.email,
                    role: this.state.role,
                    password: this.state.password,
                }).then(response =>{
                    this.setState({
                        showForm: false,
                        id: response.data.id
                    })
                    
                }).then((response) => {
                    return axios.post('/api/students',{
                        
                        indexNumber: this.state.indexNumber,
                        study: this.state.study,
                        course: this.state.course,
                        yearsOfStudy: this.state.yearsOfStudy,
                        user_id: this.state.id
                    }) 
                })
                .then((response) => {
                    this.setState({
                        name: '',
                        email: '',
                        yearsOfStudy: '',
                        course: '',
                        study: '',
                        indexNumber: '',
                        password: ''
                    })
                    this.refreshStudents();
                }).catch(error =>{
                    this.setState({
                        errorMessage: 'Postoji korisnik s tom email adresom'
                    })
                });
            }
        }
    }
    componentDidMount(){
       this.refreshStudents();
    //    this.setState({
    //         study: 'Preddiplomski'
    //    })
    }
    refreshStudents() {
        axios.get('/api/students')
            .then(response =>{
                this.setState({
                    students: response.data
                })
                if(response.data[0] == undefined){
                    //postavi poruku da nema studenata
                    this.setState({
                        message: 'Nema rezultata'
                    })
                }
                else{
                    this.setState({
                        message: 'ima rezultata'
                    })
                }    
                    axios.get('/api/profile')
                        .then(response =>{
                            this.setState({
                                courses: response.data[0].courses,
                            })
                        }).catch(error =>{
                            console.log(error);
                        })
                
            }).catch(error =>{
                console.log(error);
            })
    }
    render() {
        return (
            <div className="container">
                
                {(this.state.userRole != null)?
                    <MainNavigation role={this.state.userRole}/>
                    :null
                }
                <div>
                {!this.state.showForm?
                    <Button type="submit" color="primary" onClick={this.handleButton}>Dodaj studenta</Button>
                :   <Button type="submit" color="primary" onClick={this.handleButton}>Nazad</Button>
                }
                </div>
                {this.state.showForm?
                    <div className="offset-md-4 col-md-4 offset-md-4">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                            <label className="col-form-label">
                                Ime i prezime: 
                            </label>
                                <input 
                                    name='name'
                                    type='text'
                                    className="form-control"
                                    placeholder='Upišite ime i prezime studenta'
                                    value={this.state.name}
                                    onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label className="col-form-label">
                                    Broj indeksa: 
                                </label>
                                <input 
                                    name="indexNumber"
                                    type="text"
                                    className="form-control"
                                    placeholder="Upišite broj indeksa" 
                                    value={this.state.indexNumber}
                                    onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label className="col-form-label">
                                    Email adresa: 
                                </label>
                                <input 
                                    name="email"
                                    type="email"
                                    className="form-control"
                                    placeholder="Upišite email adresu" 
                                    value={this.state.email}
                                    onChange={this.handleChange}/>
                            </div>
                            {/*<div className="row">
                                <div className="col-md-4">
                                    <label className="form-check-label">
                                        Studij:
                                    </label>
                                </div>
                                <div className="col-md-8">    
                                 <div className="form-group">
                                        <input 
                                            type="radio" 
                                            name="study"
                                            value="Preddiplomski"
                                            className="form-check-input"
                                            checked={this.state.study === 'Preddiplomski'}
                                            onChange={this.handleChange}/>
                                        <label className="form-check-label">
                                            Preddiplomski
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <input 
                                            type="radio" 
                                            name="study"
                                            value="Diplomski"
                                            className="form-check-input"
                                            checked={this.state.study === 'Diplomski'}
                                            onChange={this.handleChange}/>
                                        <label className="form-check-label">
                                            Diplomski
                                        </label>
                                    </div>
                                </div>
                            </div> */}
                            <FormGroup row>
                                <Label sm={4}>Studij</Label>
                                <Col sm={8}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input 
                                                type="radio" 
                                                name="study" 
                                                value="Preddiplomski"
                                                checked={this.state.study === 'Preddiplomski'}
                                                onChange={this.handleChange}/>{' '}
                                                    Preddiplomski
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input 
                                                type="radio" 
                                                name="study" 
                                                value="Diplomski"
                                                checked={this.state.study === 'Diplomski'}
                                                onChange={this.handleChange}/>{' '}
                                            Diplomski
                                        </Label>
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                            <div className="form-group">
                                <label>Smjer:</label>
                                <select className="form-control"
                                    name="course"
                                    value={this.state.course} 
                                    onChange={this.handleChange}>
                                    <option value="">Odaberite smjer studija</option>
                                    {this.state.courses.map((key, index) =>
                                        <option 
                                            key={index}
                                            value={key}
                                            >{key}
                                        </option>
                                    )}
                                </select>
                            </div>   
                            <div className="form-group">
                                <label className="col-form-label">
                                    Godina studija: 
                                </label> 
                                <input 
                                    name="yearsOfStudy"
                                    type="text" 
                                    className="form-control"
                                    placeholder="Upišite godinu studija" 
                                    value={this.state.yearsOfStudy}
                                    onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label className="col-form-label">
                                    Lozinka: 
                                </label>
                                <input 
                                    name="password" 
                                    type="password"
                                    autoComplete="on"
                                    className="form-control"
                                    placeholder="Upišite lozinku" 
                                    value={this.state.password}
                                    onChange={this.handleChange}/>
                            </div>
                            <Button type="submit" color="primary">Registriraj</Button>
                            <div className="text-danger">{this.state.errorMessage}</div>
                        </form>
                    </div>
                    :this.state.students != undefined && this.state.message == 'ima rezultata'?
                        <Table bordered>
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Ime i Prezime</th>
                                    <th scope="col">Broj indeksa</th>
                                    {/* <th scope="col">Fakultet</th> */}
                                    <th scope="col">Studij</th>
                                    <th scope="col">Smjer</th>
                                    <th scope="col">Godina studija</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody> 
                            {this.state.students.map((key, index) =>
                                <StudentList key={index} student={key} index={index} courses={this.state.courses}/>        
                            )}
                            </tbody>
                        </Table>
                    :
                    <div className="offset-md-4 col-md-4 offset-md-4">
                        <ListGroup>
                            <ListGroupItem>
                                <ListGroupItemHeading>Nemate kreiranih studenata</ListGroupItemHeading>
                            </ListGroupItem>
                        </ListGroup>
                    </div>
                }

            </div>
        );
    }
}
export default Students;