import React, { Component } from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
class ProfileList extends Component {
    constructor(props){
        super(props);
        
    }
    render() {
        switch(this.props.profile.user.role){
            case 'Tvrtka': 
            return (
                <ListGroup>
                    <ListGroupItem>
                        <ListGroupItemHeading>Naziv tvrtke</ListGroupItemHeading>
                        <ListGroupItemText>{this.props.profile.user.name}</ListGroupItemText>
                    </ListGroupItem>
                    <ListGroupItem>
                        <ListGroupItemHeading>Adresa</ListGroupItemHeading>
                        <ListGroupItemText>{this.props.profile.address}</ListGroupItemText>
                    </ListGroupItem>
                    <ListGroupItem>
                        <ListGroupItemHeading>Telefon</ListGroupItemHeading>
                        <ListGroupItemText>{this.props.profile.phone}</ListGroupItemText>
                    </ListGroupItem>
                    <ListGroupItem>
                        <ListGroupItemHeading>Email adresa</ListGroupItemHeading>
                        <ListGroupItemText>{this.props.profile.user.email}</ListGroupItemText>
                    </ListGroupItem>
                    <ListGroupItem>
                        <ListGroupItemHeading>OIB</ListGroupItemHeading>
                        <ListGroupItemText>{this.props.profile.OIB}</ListGroupItemText>
                    </ListGroupItem>
                </ListGroup>
            );
            case 'Fakultet': 
                return (
                    <ListGroup>
                        <ListGroupItem>
                            <ListGroupItemHeading>Naziv sveučilišta</ListGroupItemHeading>
                            <ListGroupItemText>{this.props.profile.university}</ListGroupItemText>
                        </ListGroupItem>
                        <ListGroupItem>
                            <ListGroupItemHeading>Naziv fakulteta</ListGroupItemHeading>
                            <ListGroupItemText>{this.props.profile.user.name}</ListGroupItemText>
                        </ListGroupItem>
                        <ListGroupItem>
                            <ListGroupItemHeading>Smjerovi fakulteta</ListGroupItemHeading>
                            <ListGroupItemText>{this.props.profile.courses.join(", ")}</ListGroupItemText>
                        </ListGroupItem>
                        <ListGroupItem>
                            <ListGroupItemHeading>Adresa</ListGroupItemHeading>
                            <ListGroupItemText>{this.props.profile.address}</ListGroupItemText>
                        </ListGroupItem>
                        <ListGroupItem>
                            <ListGroupItemHeading>Telefon</ListGroupItemHeading>
                            <ListGroupItemText>{this.props.profile.phone}</ListGroupItemText>
                        </ListGroupItem>
                        <ListGroupItem>
                            <ListGroupItemHeading>Email adresa</ListGroupItemHeading>
                            <ListGroupItemText>{this.props.profile.user.email}</ListGroupItemText>
                        </ListGroupItem>
                        <ListGroupItem>
                            <ListGroupItemHeading>OIB</ListGroupItemHeading>
                            <ListGroupItemText>{this.props.profile.OIB}</ListGroupItemText>
                        </ListGroupItem>
                    </ListGroup>
                );
            case 'Student': 
                return (
                     <ListGroup>
                        <ListGroupItem>
                            <ListGroupItemHeading>Ime i prezime</ListGroupItemHeading>
                            <ListGroupItemText>{this.props.profile.user.name}</ListGroupItemText>
                        </ListGroupItem>
                        <ListGroupItem>
                            <ListGroupItemHeading>Email adresa</ListGroupItemHeading>
                            <ListGroupItemText>{this.props.profile.user.email}</ListGroupItemText>
                        </ListGroupItem>
                        <ListGroupItem>
                            <ListGroupItemHeading>Broj indeksa</ListGroupItemHeading>
                            <ListGroupItemText>{this.props.profile.indexNumber}</ListGroupItemText>
                        </ListGroupItem>
                        <ListGroupItem>
                            <ListGroupItemHeading>Naziv fakulteta</ListGroupItemHeading>
                            <ListGroupItemText>{this.props.profile.faculty}</ListGroupItemText>
                        </ListGroupItem>
                        <ListGroupItem>
                            <ListGroupItemHeading>Studij</ListGroupItemHeading>
                            <ListGroupItemText>{this.props.profile.study}</ListGroupItemText>
                        </ListGroupItem>
                        <ListGroupItem>
                            <ListGroupItemHeading>Smjer</ListGroupItemHeading>
                            <ListGroupItemText>{this.props.profile.course}</ListGroupItemText>
                        </ListGroupItem>
                        <ListGroupItem>
                            <ListGroupItemHeading>Godina studija</ListGroupItemHeading>
                            <ListGroupItemText>{this.props.profile.yearsOfStudy}</ListGroupItemText>
                        </ListGroupItem>
                        <ListGroupItem>
                            <ListGroupItemHeading>OIB</ListGroupItemHeading>
                            <ListGroupItemText>{this.props.profile.OIB}</ListGroupItemText>
                        </ListGroupItem>
                    </ListGroup>
                ); 
            default: return null;   
        }
    }
}
export default ProfileList;