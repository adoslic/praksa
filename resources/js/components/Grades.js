import React, { Component } from 'react';
import MainNavigation from './MainNavigation';
import Grade from './Grade';
import { ListGroup, ListGroupItem, ListGroupItemHeading } from 'reactstrap';
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
                this.setState({
                    students: response.data
                }) 
            }).catch(error =>{
                console.log(error);
            })

        axios.get('/api/practise/')
            .then(response =>{
                this.setState({
                        user: response.data[1][0],
                        practises: response.data[0],
                });
                
                    this.state.practises.forEach(practise => {
                        this.state.students.forEach(student => {
                                if(practise.status == 'locked' && practise.candidates[0].id == student.user_id){
                                    var array = this.state.grades;
                                    array.push(practise);
                                    this.setState({
                                        grades: array
                                    })
                                }
                        });
                    });

                
            }).catch(error =>{
                console.log(error);
            });
        
    }
    
    render() {
        return (
            <div className="container">
                
                {(this.state.userRole != null)?
                    <MainNavigation role={this.state.userRole}/>
                :null
                }

                {this.state.grades[0] != undefined?
                    <div className="offset-md-4 col-md-4 offset-md-4">
                    {this.state.grades.map((key, index) => 
                        <Grade key={index} grade={key}/>
                    )}
                    </div>
                :<div className="offset-md-4 col-md-4 offset-md-4">
                    <ListGroup>
                        <ListGroupItem>
                            <ListGroupItemHeading>Nema dostupnih studenata</ListGroupItemHeading>
                        </ListGroupItem>
                    </ListGroup>
                </div>
                }
            </div>

        );
    }
}
export default Grades;