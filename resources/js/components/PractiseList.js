import React, { Component } from 'react';
import { Button, Label, ListGroup, ListGroupItem, Modal, ModalBody, 
    ModalFooter, ModalHeader, Form, FormGroup, Col, Input } from 'reactstrap';
import StudentProfile from './StudentProfile';
import PractiseShow from './PractiseShow';
class PractiseList extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: this.props.user || '',
            userRole: localStorage.getItem('role'),
            id: this.props.practice.id,
            name:  this.props.practice.name,
            description: this.props.practice.description,
            faculties: this.props.practice.faculties,
            start: this.props.practice.start,
            duration: this.props.practice.duration,
            status: this.props.practice.status,
            candidates: this.props.practice.candidates,
            candidatesNames: [],
            company_id: this.props.practice.company_id,
            profile:[],
            List: [],
            faculty: [],
            applied: false,
            allowed: false,
            mypractise: false,

            showRow: true,

            errorMessage: '',
            modalShow: false,
            modalEdit: false,
            modalDelete: false,
            modalProfile: false,
            student: [],

        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.checkFaculty = this.checkFaculty.bind(this);
        this.onClickChange = this.onClickChange.bind(this);
        this.handleApply = this.handleApply.bind(this);
        this.checkApply = this.checkApply.bind(this);
        this.handleUnapply = this.handleUnapply.bind(this);
        this.checkUserRole = this.checkUserRole.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.toggleDelete = this.toggleDelete.bind(this);
        this.toggleProfile = this.toggleProfile.bind(this);
    }
    handleEdit(){
        axios.get('/api/practise/'+this.state.id+'/edit')
            .then(response =>{
                this.setState({
                    List: response.data[1],
                })
                let obj = {};
                this.state.faculties.map((faculty, index) =>
                    obj[faculty] = true
                )
                this.setState({
                    faculty : obj
                })
            }).catch(error =>{
                console.log(error);
            })

    }
    handleBack(){
        if(this.props.index != undefined){
            this.props.changeState();
        }
    }
    handleChange(e){
        this.setState({ [e.target.name] : e.target.value });
    }
    handleUpdate(){

        var dataRege = /^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.]\d{4}$/;

        this.setState({
            errorMessage: ''
        })
        const obj = this.state.faculty;
        var fList = Object.keys(obj).filter( function (key) {
            return obj[key]===true;
        });

        if(this.state.name == '' || this.state.description == '' || fList == ''||
            this.state.start == '' || this.state.duration == '' || this.state.status == ''){
                this.setState({
                    errorMessage: 'Ispunite sva polja'
                })
        }
        else{
            if(!this.state.start.match(dataRege)){
                this.setState({
                    errorMessage: 'Neispravan datum početka'
                })
            }else if(isNaN(this.state.duration) || this.state.duration.length > 1){
                        this.setState({
                            errorMessage: 'Neispravano trajanje prakse'
                        })
            }
            else{
                const obj = this.state.faculty;
                var fList = Object.keys(obj).filter( function (key) {
                    return obj[key]===true;
                });
                axios.post('/api/practise/'+this.state.id,{
                    _method : 'PUT',
                    name: this.state.name,
                    company_id: this.state.company_id,
                    description: this.state.description,
                    faculties: fList,
                    start: this.state.start,
                    duration: this.state.duration,
                    status: this.state.status,
                    candidates: this.state.candidates
                }).then(response =>{
                    this.setState({
                        status: response.data.status
                    })
                    this.handleBack();
                    this.toggleEdit();
                }).catch(error =>{
                    console.log(error);
                })
            }
        }
    }
    handleDelete(){
        axios.delete('/api/practise/'+this.state.id)
            .then(response =>{
                this.props.changeState();
                this.handleBack();
                this.toggleDelete();
            }).catch(error =>{
                console.log(error);
            })
    }
    checkFaculty(name){
            const obj = this.state.faculty;
            if(obj.hasOwnProperty(name)){
                return obj[name];
            }
            return false;
    }
    onClickChange(e){
        const val = e.target.checked;
        const name = e.target.name;
        let updateFaculty = Object.assign({},this.state.faculty,{[name]:val})
        this.setState({
            faculty: updateFaculty
        })
    }
    handleApply(e){
        let array = this.state.candidates;
        var obj = {
                id: this.state.user.user.id,
                name: this.state.user.user.name,
                email: this.state.user.user.email
            };
        array.push(obj);

        axios.post('/api/practise/'+this.state.id,{
                    _method : 'PUT',
                    candidates: array
                }).then(response =>{
                        this.setState({
                            applied: true
                        })
                }).catch(error =>{
                    console.log(error);
                })
    }
    componentDidMount(){
        this.checkUserRole();
        if(this.state.userRole == 'Student'){
            this.checkApply();
        }
        
    }
    checkApply(){
        if(this.props.index == undefined){
            this.setState({
                mypractise : true
            })
        }
        else{
            let user = this.state.user.user;
            this.state.candidates.forEach((key) => {
                if(key != null && key.id == user.id){
                    this.setState({
                        applied : true
                    })
                }
            });
        }
    }
    handleUnapply(){
        let array = this.state.candidates;
        let user = this.state.user.user;

        var index = array.findIndex(x => x.id === user.id);
        if (index > -1) {
            array.splice(index, 1);
            axios.post('/api/practise/'+this.state.id,{
                    _method : 'PUT',
                    candidates: array
                }).then(response =>{
                    this.setState({
                        applied: false
                    })
                    
                    this.handleBack();
                }).catch(error =>{
                    console.log(error);
                })
        }
    }
    checkUserRole(){
        if(this.state.userRole == 'Student'){
            if(this.props.index == undefined){
                this.setState({
                    allowed: true
                })
            }
            else{
                this.state.faculties.forEach((element) => {
                    if(element == this.state.user.faculty && this.state.status == 'free'){
                        this.setState({
                            allowed: true
                        })
                    }
                })
            }
        }
        else{
            this.setState({
                allowed: true
            })
        }
        let array = []
        this.state.candidates.map((candidate, index) =>
            array.push(candidate.name)
        )
        this.setState({
            candidatesNames: array
        })
    }
    toggleShow() {
        this.setState(prevState => ({
            modalShow: !prevState.modalShow
        }));
    }
    toggleEdit() {
        if(!this.state.modalEdit){
            this.handleEdit();
        }
        this.setState(prevState => ({
            modalEdit: !prevState.modalEdit
        }));
    }
    toggleDelete() {
        this.setState(prevState => ({
            modalDelete: !prevState.modalDelete
        }));
    }
    getProfile(id){
        axios.get('/api/profile/'+id)
            .then(response =>{
                this.setState({
                    student: response.data[0]
                })
                this.toggleProfile();
            }).catch(error =>{
                console.log(error);
            })   
    }
    toggleProfile(){
        this.setState(prevState => ({
            modalProfile: !prevState.modalProfile
        }));
    }
    acceptApplication(candidate){
        let array = [];
        var obj = {
                id: candidate.id,
                name: candidate.name,
                email: candidate.email
            };
        array.push(obj);
        axios.post('/api/practise/'+this.state.id,{
                    _method : 'PUT',
                    candidates: array,
                }).then(response =>{
                    this.setState({
                        status: response.data.status,
                        candidates: response.data.candidates
                    })
                    this.props.changeState();
                    this.toggleEdit();
                    this.handleBack();
                }).catch(error =>{
                    console.log(error);
                })
    }
    render() {
            return (
                this.state.allowed?
                    this.state.showRow?
                        <tr>  
                            <th scope="row">{this.props.index+1}</th>
                            <td>{this.state.name}</td>
                            <td>{this.state.start}</td>
                            <td>{this.state.duration} {'tjedana'}</td>
                            <td>{(this.state.status == 'free')?'Slobodno'
                                :(this.state.status == 'taken')?'Zauzeto'
                                :(this.state.status == 'finished')?'Odrađeno'
                                :(this.state.status == 'grade')?'Ocjenjeno'
                                :(this.state.status == 'locked')?'Zaključana'
                            :null
                            }
                            </td>
                            <td>
                                <Button color="primary" onClick={this.toggleShow}>Detaljnije</Button>{' '}
                                {(this.state.userRole == 'Tvrtka' && this.state.status != 'locked')?
                                    <Button color="secondary" onClick={this.toggleEdit}>Uredi</Button>
                                :null
                                }
                                {' '}
                                {(this.state.userRole == 'Tvrtka' && this.state.status != 'locked')?
                                    <Button color="primary" onClick={this.toggleDelete}>Obriši</Button>
                                :null
                                }
                            
                            {(this.state.userRole == 'Student' && !this.state.mypractise)?
                                (!this.state.applied)?
                                // <td>
                                    <Button color="primary" onClick={this.handleApply}>Prijava</Button>
                                // </td>
                                // :<td>
                                    :<Button color="secondary" onClick={this.handleUnapply}>Odjava</Button>
                                // </td>
                            :null
                            }
                            </td>
                            {/* <td><div>{this.state.errorMessage}</div></td> */}
                            {this.state.modalShow?
                                <PractiseShow practice={this.props.practice} toggle={this.toggleShow} 
                                user={this.state.user} candidatesNames={this.state.candidatesNames}/>
                            :null}
                            <Modal isOpen={this.state.modalEdit} toggle={this.toggleEdit}>
                            <ModalHeader toggle={this.toggleEdit}>Uredi</ModalHeader>
                            <ModalBody>
                                <Form>
                                    <div className="text-danger">{this.state.errorMessage}</div>
                                    <FormGroup row>
                                        <Label sm={2}>Naziv</Label>
                                        <Col sm={10}>
                                            <Input 
                                            type="text" 
                                            name="name"
                                            value={this.state.name}
                                            onChange={this.handleChange}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label sm={2}>Opis</Label>
                                        <Col sm={10}>
                                            <Input 
                                            type="text" 
                                            name="description"
                                            value={this.state.description}
                                            onChange={this.handleChange}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label sm={2}>Fakulteti</Label>
                                        <Col sm={10}>
                                            {this.state.List.map((faculty, i) =>
                                                <FormGroup check key={i}>
                                                    <Label check>
                                                        <Input 
                                                            type="checkbox" 
                                                            name={faculty.name}
                                                            value={this.state.faculty[i]}
                                                            checked={this.checkFaculty(faculty.name)}
                                                            onChange={this.onClickChange}/>{' '}
                                                            {faculty.name}
                                                    </Label>
                                                </FormGroup>
                                            )}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label sm={2}>Početak</Label>
                                        <Col sm={10}>
                                            <Input 
                                            type="text" 
                                            name="start"
                                            value={this.state.start}
                                            onChange={this.handleChange}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label sm={2}>Trajanje</Label>
                                        <Col sm={10}>
                                            <Input 
                                            type="text" 
                                            name="duration"
                                            value={this.state.duration}
                                            onChange={this.handleChange}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label sm={2}>Status</Label>
                                        <Col sm={10}>
                                            <FormGroup check>
                                                <Label check>
                                                    <Input 
                                                    type="radio" 
                                                    name="status"
                                                    value="free"
                                                    checked={this.state.status === 'free'}
                                                    onChange={this.handleChange}/>{' '}
                                                    Slobodno
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check>
                                                <Label check>
                                                    <Input 
                                                    type="radio" 
                                                    name="status"
                                                    value="taken"
                                                    checked={this.state.status === 'taken'}
                                                    onChange={this.handleChange}/>{' '}
                                                    Zauzeto
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check>
                                                <Label check>
                                                    <Input 
                                                    type="radio" 
                                                    name="status"
                                                    value="finished"
                                                    checked={this.state.status === 'finished'}
                                                    onChange={this.handleChange}/>{' '}
                                                    Odrađeno
                                                </Label>
                                            </FormGroup>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label sm={2}>Kandidati</Label>
                                        <Col sm={10}>
                                            <ListGroup>
                                                {this.state.candidates.map((candidate, index) =>
                                                    <ListGroupItem
                                                        key={index}>
                                                            {candidate.name}{' '}
                                                            <div>
                                                                <Button color="primary" onClick={this.getProfile.bind(this, candidate.id)}>Prikaži profil</Button>{' '}
                                                                {this.state.status == 'free'?
                                                                    <Button color="secondary" onClick={this.acceptApplication.bind(this, candidate)}>Prihvati prijavu</Button>
                                                                :null}
                                                            </div>
                                                    </ListGroupItem>
                                                )}
                                            </ListGroup>
                                        </Col>
                                    </FormGroup>
                                </Form>    
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.handleUpdate}>Spremi</Button>{' '}
                                <Button color="secondary" onClick={this.toggleEdit}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                        <Modal isOpen={this.state.modalDelete} toggle={this.toggleDelete}>
                            <ModalHeader toggle={this.toggleDelete}>Obriši</ModalHeader>
                            <ModalBody>Želite li obrisati praksu?</ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.handleDelete}>Obriši</Button>{' '}
                                <Button color="secondary" onClick={this.toggleDelete}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                        {this.state.modalProfile && this.state.student.id != undefined?
                            <StudentProfile student={this.state.student} toggle={this.toggleProfile}/>
                        :null}
                        
                        </tr>
                    :null
                :null
            );
            
    }
}
export default PractiseList;