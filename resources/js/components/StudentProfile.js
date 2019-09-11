import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, 
    Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

class StudentProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            modalShow: true,
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
        }

        this.toggleShow = this.toggleShow.bind(this);
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
    toggleShow() {
        this.setState(prevState => ({
            modalShow: !prevState.modalShow
        }));
        this.props.toggle();
    }
    render() {
        return (
            <Modal isOpen={this.state.modalShow} toggle={this.toggleShow}>
                <ModalHeader toggle={this.toggleShow}>{this.state.name}</ModalHeader>
                <ModalBody>
                    <ListGroup>
                        <ListGroupItem>
                            <ListGroupItemHeading>Email adresa</ListGroupItemHeading>
                            <ListGroupItemText>{this.state.email}</ListGroupItemText>
                        </ListGroupItem>
                        <ListGroupItem>
                            <ListGroupItemHeading>Fakultet</ListGroupItemHeading>
                            <ListGroupItemText>{this.state.faculty}</ListGroupItemText>
                        </ListGroupItem>
                        <ListGroupItem>
                            <ListGroupItemHeading>Studij</ListGroupItemHeading>
                            <ListGroupItemText>{this.state.study}</ListGroupItemText>
                        </ListGroupItem>
                        <ListGroupItem>
                            <ListGroupItemHeading>Smjer</ListGroupItemHeading>
                            <ListGroupItemText>{this.state.course}</ListGroupItemText>
                        </ListGroupItem>
                        <ListGroupItem>
                            <ListGroupItemHeading>Godina studija</ListGroupItemHeading>
                            <ListGroupItemText>{this.state.yearsOfStudy}</ListGroupItemText>
                        </ListGroupItem>
                        <ListGroupItem>
                            <ListGroupItemHeading>Broj indeksa</ListGroupItemHeading>
                            <ListGroupItemText>{this.state.indexNumber}</ListGroupItemText>
                        </ListGroupItem>
                        <ListGroupItem>
                            <ListGroupItemHeading>OIB</ListGroupItemHeading>
                            {(this.state.OIB != '')?
                            <ListGroupItemText>{this.state.OIB}</ListGroupItemText>
                            :<ListGroupItemText>-</ListGroupItemText>
                            }
                        </ListGroupItem>
                    </ListGroup>
                </ModalBody>
                <ModalFooter>
                        <Button color="primary" onClick={this.toggleShow}>Nazad</Button>
                </ModalFooter>
            </Modal>
        );
    }
}
export default StudentProfile;