import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
    Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

class PractiseShow extends Component {
    constructor(props){
        super(props);
        this.state = {
            userRole: localStorage.getItem('role'),
            user: this.props.user || '',
            id: this.props.practice.id,
            name:  this.props.practice.name,
            description: this.props.practice.description,
            faculties: this.props.practice.faculties,
            start: this.props.practice.start,
            duration: this.props.practice.duration,
            status: this.props.practice.status,
            candidates: this.props.practice.candidates,

            candidatesNames: this.props.candidatesNames,
            modalShow: true,

        }
        this.toggleShow = this.toggleShow.bind(this);
    }
    componentDidMount(){
        axios.get('/api/practise/'+this.state.id)
            .then(response =>{
                this.setState({
                    name:  response.data[0].name,
                    description: response.data[0].description,
                    faculties: response.data[0].faculties,
                    start: response.data[0].start,
                    duration: response.data[0].duration,
                    status: response.data[0].status,
                    candidates: response.data[0].candidates,
                })

                let array = []
                this.state.candidates.map((candidate, index) =>
                    array.push(candidate.name)
                )
                this.setState({
                    candidatesNames: array
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
                                <ListGroupItemHeading>Opis</ListGroupItemHeading>
                                <ListGroupItemText>{this.state.description}</ListGroupItemText>
                            </ListGroupItem>
                            <ListGroupItem>
                                <ListGroupItemHeading>Početak</ListGroupItemHeading>
                                <ListGroupItemText>{this.state.start}</ListGroupItemText>
                            </ListGroupItem>
                            <ListGroupItem>
                                <ListGroupItemHeading>Trajanje</ListGroupItemHeading>
                                <ListGroupItemText>{this.state.duration} tjedana</ListGroupItemText>
                            </ListGroupItem>
                            <ListGroupItem>
                                <ListGroupItemHeading>Fakulteti</ListGroupItemHeading>
                                <ListGroupItemText>{this.state.faculties.join(", ")}</ListGroupItemText>
                            </ListGroupItem>
                            <ListGroupItem>
                                <ListGroupItemHeading>Status</ListGroupItemHeading>
                                <ListGroupItemText>
                                {(this.state.status == 'free')?'Slobodno'
                                    :(this.state.status == 'taken')?'Zauzeto'
                                    :(this.state.status == 'finished')?'Odrađeno'
                                    :(this.state.status == 'grade')?'Ocjenjeno'
                                    :(this.state.status == 'locked')?'Zaključana'
                                :null}
                                </ListGroupItemText>
                            </ListGroupItem>
                            <ListGroupItem>
                                <ListGroupItemHeading>Tvrtka</ListGroupItemHeading>
                                <ListGroupItemText>
                                {this.props.practice.company != null?
                                    this.props.practice.company.user.name
                                    : ''}
                                </ListGroupItemText>
                            </ListGroupItem>
                            {this.state.userRole != 'Student'?
                                this.state.candidatesNames.join(", ") != ''?
                                    <ListGroupItem>
                                        <ListGroupItemHeading>Kandidati</ListGroupItemHeading>
                                        <ListGroupItemText>
                                            {this.state.candidatesNames.join(", ")}
                                        </ListGroupItemText>
                                    </ListGroupItem>
                                :null
                            :null}
                        </ListGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggleShow}>Nazad</Button>
                    </ModalFooter>
                </Modal>
            );
    }
}
export default PractiseShow;