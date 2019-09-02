import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import MainNavigation from './MainNavigation';
import Grade from './Grade';

class Grades extends Component {
    constructor(props){
        super(props);

        this.state = {
            userRole: localStorage.getItem('role'),
            practises: [],
            grades: [],
            students: [],

        };
        this.reloadPractise = this.reloadPractise.bind(this);
    }
    componentDidMount(){
        this.reloadPractise();
    }
    reloadPractise(){
        axios.get('/api/students')
            .then(response =>{
                //console.log(response);
                this.setState({
                    students: response.data
                }) 
                //console.log(this.state.students);
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

        axios.get('/api/practise/')
            .then(response =>{
                //console.log(response);
                this.setState({
                        user: response.data[1][0],
                        practises: response.data[0],
                        //showPractise: true
                });
                
                    this.state.practises.forEach(practise => {
                        this.state.students.forEach(student => {
                            //console.log(practise.candidates[0]);
                            //console.log(student.user_id);
                            //console.log(practise);
                                if(practise.status == 'locked' && practise.candidates[0].id == student.user_id){
                                    //console.log(practise.candidates[0].id);
                                    var array = this.state.grades;
                                    array.push(practise);
                                    this.setState({
                                        grades: array
                                    })
                                }
                        });
                    });

                //console.log(this.state.grades);
                //console.log(this.state.practices);
                
            }).catch(error =>{
                console.log(error);
            });
        
    }
    
    render() {
        return (
            <div>
                
                {(this.state.userRole != null)?
                    <MainNavigation role={this.state.userRole}/>
                :null
                }

                {this.state.grades[0] != undefined?
                    //console.log('rado')
                    this.state.grades.map((key, index) => 
                    // <div>
                    //     <label>Name: {element.candidates[0].name}</label>
                    //     <label>Grade: {element.candidates[0].name}</label>
                    // </div>
                    
                    <Grade key={index} grade={key}/>
                    //console.log(this.state.grades)
                    )
                :<div>No results</div>
                }
            </div>

        );
    }
}
export default Grades;