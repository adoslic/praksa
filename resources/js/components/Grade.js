import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

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
        //console.log(this.props.grade.id);
    }
    reloadPractise(){
        axios.get('/api/reports/'+this.props.grade.id)
            .then(response =>{
                //console.log(response);
                this.setState({
                    report: response.data
                }) 
                //console.log(this.state.faculties);
                // this.state.faculties.forEach(element => {
                //     //console.log(element.user_id);
                //     if(element.user_id == this.state.report.student_id){
                //         this.setState({
                //             faculty: true
                //         }) 
                //     }
                // });
            }).catch(error =>{
                console.log(error);
            })
        //console.log('radi');
        
        
    }
    render() {
        return (
            <div>
                <label>Name: {this.props.grade.candidates[0].name}</label>
                <label>Grade: {this.state.report.facultyGrade}</label>
            </div>

        );
    }
}
export default Grade;