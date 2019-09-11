import React, { Component } from 'react';
import axios from 'axios';
import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, 
    Form, FormGroup, Col, Input } from 'reactstrap';
import StudentProfile from './StudentProfile';


class StudentList extends Component {
    constructor(props){
        super(props);

        this.state = {
            id: this.props.student.id,
            name:  this.props.student.user.name,
            email: this.props.student.user.email,
            indexNumber: this.props.student.indexNumber,
            faculty: this.props.student.faculty,
            study: this.props.student.study,
            course: this.props.student.course,
            yearsOfStudy: this.props.student.yearsOfStudy,
            OIB: this.props.student.OIB,
            user_id: this.props.student.user_id,
            errorMessage: '',
            modalShow: false,
            modalEdit: false,

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
    }
    
    componentDidMount(){
        axios.get('/api/students/'+this.state.id)
            .then(response =>{
                this.setState({
                    name:  response.data[0].user.name,
                    email: response.data[0].user.email,
                    indexNumber: response.data[0].indexNumber,
                    faculty: response.data[0].faculty,
                    study: response.data[0].study,
                    course: response.data[0].course,
                    yearsOfStudy: response.data[0].yearsOfStudy,
                    OIB: response.data[0].OIB,
                    user_id: response.data[0].user_id,
                })
            }).catch(error =>{
                console.log(error);
            })
    }
    handleChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }
    handleUpdate(){
        this.setState({
            errorMessage: ''
        })
        if(this.state.name == '' || this.state.indexNumber == '' ||
            this.state.study == ''|| this.state.course == ''|| this.state.yearsOfStudy == ''){
                
                this.setState({
                    errorMessage: 'Ispunite sva polja'
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
            axios.post('/api/students/'+this.state.id,{
                _method : 'PUT',
                name: this.state.name,
                user_id: this.state.user_id,
                indexNumber: this.state.indexNumber,
                faculty: this.state.faculty,
                course: this.state.course,
                study: this.state.study,
                yearsOfStudy: this.state.yearsOfStudy,
            }).then(response =>{
                this.toggleEdit();
            }).catch(error =>{
                console.log(error);
            })
        }
    }
    toggleShow() {
        this.setState(prevState => ({
            modalShow: !prevState.modalShow
        }));
        
    }
    toggleEdit() {
        this.setState(prevState => ({
            modalEdit: !prevState.modalEdit
        }));
      }
    
    render() {
        return (
                    <tr> 
                        <th scope="row">{this.props.index+1}</th>
                        <td>{this.state.name}</td>
                        <td>{this.state.indexNumber}</td>
                        <td>{this.state.study}</td>
                        <td>{this.state.course}</td>
                        <td>{this.state.yearsOfStudy}</td>
                        <td>
                            <Button color="primary" onClick={this.toggleShow}>Detaljnije</Button>{' '}
                            <Button color="primary" onClick={this.toggleEdit}>Uredi</Button>
                        </td>
                        
                        {this.state.modalShow?
                            <StudentProfile student={this.props.student} toggle={this.toggleShow}/>
                        :null}
                        

                        <Modal isOpen={this.state.modalEdit} toggle={this.toggleEdit}>
                            <ModalHeader toggle={this.toggleEdit}>Uredi</ModalHeader>
                            <ModalBody>
                                <Form>
                                <div className="text-danger">{this.state.errorMessage}</div>
                                    <FormGroup row>
                                        <Label sm={2}>Ime i prezime</Label>
                                        <Col sm={10}>
                                            <Input 
                                            type="text" 
                                            name="name"
                                            value={this.state.name}
                                            onChange={this.handleChange}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label sm={2}>Studij</Label>
                                        <Col sm={10}>
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
                                    <FormGroup row>
                                        <Label sm={2}>Smjer</Label>
                                        <Col sm={10}>
                                        <Input 
                                            type="select" 
                                            name="course"
                                            value={this.state.course} 
                                            onChange={this.handleChange}>
                                                <option value="">Odaberite smjer studija</option>
                                                {this.props.courses.map((key, index) =>
                                                    <option 
                                                        key={index}
                                                        value={key}
                                                        >{key}
                                                    </option>
                                                )}
                                        </Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label sm={2}>Godina studija</Label>
                                        <Col sm={10}>
                                            <Input 
                                            type="text" 
                                            name="yearsOfStudy"
                                            value={this.state.yearsOfStudy}
                                            onChange={this.handleChange}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label sm={2}>Broj indeksa</Label>
                                        <Col sm={10}>
                                            <Input 
                                            type="text" 
                                            name="indexNumber"
                                            value={this.state.indexNumber}
                                            onChange={this.handleChange}/>
                                        </Col>
                                    </FormGroup>
                                    
                                </Form>    
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.handleUpdate}>Spremi</Button>{' '}
                                <Button color="secondary" onClick={this.toggleEdit}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </tr>
        );
    }
}
export default StudentList;