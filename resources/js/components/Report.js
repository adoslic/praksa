import React, { Component } from 'react';
import { Button, Label, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, 
    Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Col, Input } from 'reactstrap';

class Report extends Component {
    constructor(props){
        super(props);

        this.state = {
            userRole: localStorage.getItem('role'),
            id: this.props.practise.id,
            name: this.props.practise.name,
            description: this.props.practise.description,
            duration: this.props.practise.duration,
            status: this.props.practise.status,
            start: this.props.practise.start,
            faculties: [],
            faculty: false,
            report: this.props.report,
            showReport: false,
            showPractise: true,
            href: '',
            file: '',
            grade: '',
            comment: '',
            studentName: this.props.practise.candidates[0].name,
            graded: false,
            facultyComment: '',
            facultyGrade: '',
            modalShow: false,


        };
        this.showButtonReport = this.showButtonReport.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.download = this.download.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
    }
    
    componentDidMount(){

        this.checkReport();
    }
    showButtonReport(){
        this.setState({
            showReport: true,
            showPractise: false,
        })
    }
    checkReport(){
        if(this.state.report.comment != undefined && this.state.report.comment != ''){
            this.setState({
                comment: this.state.report.comment,
            });
        }

        if(this.state.report.grade != undefined && this.state.report.grade != ''){
            this.setState({
                grade: this.state.report.grade,
            });
        }
        if(this.state.report.facultyComment != undefined && this.state.report.facultyComment != ''){
            this.setState({
                facultyComment: this.state.report.facultyComment,
            });
        }
        if(this.state.report.facultyGrade != undefined && this.state.report.facultyGrade != ''){
            this.setState({
                facultyGrade: this.state.report.facultyGrade,
            });
        }
        
        
    }
    handleBack(){
        this.setState({
            showReport: false,
            showPractise: true,
            grade: '',
            comment: '',
        });
        this.props.reloadPage();
    }
    download(){
        const response = {
            file: '/storage/report/'+this.state.report.file,
        };
        this.setState({
            href: response.file
        })
    }
    handleSubmit(e){
        e.preventDefault();
        var formData  = new FormData();
        var file = this.state.file;
        var fileName = this.state.report.file;
        var grade = this.state.grade;
        var comment = this.state.comment;
        var facultyGrade = this.state.facultyGrade;
        var facultyComment = this.state.facultyComment;
        formData.append('file', file);
        formData.append('_method', 'PUT');
        formData.append('fileName', fileName);
        formData.append('grade', grade);
        formData.append('comment', comment);
        formData.append('facultyGrade', facultyGrade);
        formData.append('facultyComment', facultyComment);
        axios.post('/api/reports/'+this.state.id,
                    formData,{
                    headers: {
                            processData: false,
                            contentType: false
                        }
                    }
                    ).then(response =>{
                        this.setState({
                            report: response.data
                        })
                        
                        if(this.state.report.grade != ''){
                            this.setState({
                                graded: true
                            })
                        }
                        if(this.state.report.facultyGrade != ''){
                            axios.post('/api/practise/'+this.state.id,{
                                    _method : 'PUT',
                                    status: 'grade',
                                }).then(response =>{
                                    this.setState({
                                        faculty: false
                                    })
                                }).catch(error =>{
                                    console.log(error);
                                })
                        }
                        this.handleBack();
                        this.toggleShow();
                    }).catch(error =>{
                        console.log(error);
                    })
    }
    onChangeHandler(event){
        let file =  event.target.files[0];
         this.setState({
            file: file
        })
    }
    handleChange(event){
        this.setState({ [event.target.name] : event.target.value });
    }
    toggleShow() {

        if(!this.state.modalShow){
            axios.get('/api/reports/'+this.state.id)
            .then(response =>{
                this.setState({
                    file: response.data.file,
                    grade: response.data.grade,
                    comment: response.data.comment,
                    facultyComment: response.data.facultyComment,
                    facultyGrade: response.data.facultyGrade,
                })
            }).catch(error =>{
                console.log(error);
            })
        }
        
        this.setState(prevState => ({
            modalShow: !prevState.modalShow
        }));
    }
    render() {
        return (
                        <tr>
                            <td>{this.props.index+1}</td>
                            <td>{this.state.name}</td>
                            <td>{this.state.start}</td>
                            <td>{(this.state.status == 'free')?'Slobodno'
                                :(this.state.status == 'taken')?'Zauzeto'
                                :(this.state.status == 'finished')?'Odrađeno'
                                :(this.state.status == 'grade')?'Ocjenjeno'
                                :(this.state.status == 'locked')?'Zaključana'
                            :null
                            }
                            </td>
                            <td>{this.state.studentName}</td>
                            {this.state.report.id != undefined?
                                <td><Button color="primary" onClick={this.toggleShow}>Prikaži izvještaj</Button></td>
                                :<td>Nema izvještaja</td>
                            }
                        
                        <Modal isOpen={this.state.modalShow} toggle={this.toggleShow}>
                            <ModalHeader toggle={this.toggleShow}>{this.state.name}</ModalHeader>
                            {this.state.userRole == 'Tvrtka'?
                            <ModalBody>
                                <Form>
                                    <ListGroup>
                                    <ListGroupItem>
                                            <ListGroupItemHeading>Izvještaj dostupan na linku</ListGroupItemHeading>
                                            {/* <label>Izvještaj dostupan na linku: </label> */}
                                            <ListGroupItemText>
                                                <a href={this.state.href} download onClick={this.download}>{' '}{this.state.report.file}</a>
                                            </ListGroupItemText>
                                        </ListGroupItem>
                                    </ListGroup>
                                    <FormGroup row>
                                        <Label sm={2}>Ocjena tvrtke</Label>
                                        <Col sm={10}>
                                            <Input 
                                            type="textarea"
                                            name="grade"
                                            value={this.state.grade}
                                            onChange={this.handleChange}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label sm={2}>Komentar tvrtke</Label>
                                        <Col sm={10}>
                                            <Input 
                                            type="textarea"
                                            name="comment"
                                            value={this.state.comment}
                                            onChange={this.handleChange}/>
                                        </Col>
                                    </FormGroup>
                                    {this.state.facultyComment != ''?
                                    <FormGroup>
                                        <ListGroup>
                                            <ListGroupItem>
                                                <ListGroupItemHeading>Komentar fakulteta</ListGroupItemHeading>
                                                <ListGroupItemText>{this.state.facultyComment}</ListGroupItemText>
                                            </ListGroupItem>
                                        </ListGroup>
                                    </FormGroup>
                                    :null}
                                </Form>
                                
                            </ModalBody>
                            :<ModalBody>
                                <Form>
                                    <ListGroup>
                                    <ListGroupItem>
                                            <ListGroupItemHeading>Izvještaj dostupan na linku</ListGroupItemHeading>
                                            
                                            <ListGroupItemText>
                                                <a href={this.state.href} download onClick={this.download}>{' '}{this.state.report.file}</a>
                                            </ListGroupItemText>
                                        </ListGroupItem>
                                    </ListGroup>
                                    {this.state.comment != ''?
                                        <ListGroup>
                                            <ListGroupItem>
                                                <ListGroupItemHeading>Komentar tvrtke</ListGroupItemHeading>
                                                <ListGroupItemText>{this.state.comment}</ListGroupItemText>
                                            </ListGroupItem>
                                        </ListGroup>
                                    :null}
                                    {this.state.grade != ''?
                                        <ListGroup>
                                            <ListGroupItem>
                                                <ListGroupItemHeading>Ocjena tvrtke</ListGroupItemHeading>
                                                <ListGroupItemText>{this.state.grade}</ListGroupItemText>
                                            </ListGroupItem>
                                        </ListGroup>
                                    :null}
                                    <FormGroup row>
                                        <Label sm={2}>Komentar fakulteta</Label>
                                        <Col sm={10}>
                                            <Input 
                                            type="textarea" 
                                            name="facultyComment"
                                            value={this.state.facultyComment}
                                            onChange={this.handleChange}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label sm={2}>Ocjena fakulteta</Label>
                                        <Col sm={10}>
                                            <Input 
                                            type="textarea" 
                                            name="facultyGrade"
                                            value={this.state.facultyGrade}
                                            onChange={this.handleChange}/>
                                        </Col>
                                    </FormGroup>
                                </Form>    
                            </ModalBody>
                            }
                            <ModalFooter>
                                <Button color="primary" onClick={this.handleSubmit}>Pošalji</Button>{' '}
                                <Button color="secondary" onClick={this.toggleShow}>Nazad</Button>
                            </ModalFooter>
                        </Modal>
                        </tr>
        );
    }
}
export default Report;