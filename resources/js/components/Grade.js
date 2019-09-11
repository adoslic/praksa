import React, { Component } from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading } from 'reactstrap';
class Grade extends Component {
    constructor(props){
        super(props);

        this.state = {
            report: [],

        };
        this.reloadPractise = this.reloadPractise.bind(this);
    }
    componentDidMount(){
        this.reloadPractise();
    }
    reloadPractise(){
        axios.get('/api/reports/'+this.props.grade.id)
            .then(response =>{
                this.setState({
                    report: response.data
                }) 
            }).catch(error =>{
                console.log(error);
            })
        
        
    }
    render() {
        return (
            <ListGroup>
                <ListGroupItem>
                <ListGroupItemHeading>{this.props.grade.candidates[0].name}{': '}{this.state.report.facultyGrade}</ListGroupItemHeading>
                    
                </ListGroupItem>
            </ListGroup>

        );
    }
}
export default Grade;