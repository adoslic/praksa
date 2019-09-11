import React, { Component } from 'react';
import MainNavigation from './MainNavigation';
import Report from './Report';
import { ListGroup, ListGroupItem, ListGroupItemHeading,  Table} from 'reactstrap';

class ReportList extends Component {
    constructor(props){
        super(props);

        this.state = {
            userRole: localStorage.getItem('role'),
            practises: [],
            practise: [],
            reports: [],
            report: [],
            errorMessage: '',
            graded: '',
            students: [],
        };
        this.reloadPage = this.reloadPage.bind(this);
        this.checkFaculty = this.checkFaculty.bind(this);
    }
    componentDidMount(){
        this.checkFaculty();
        this.reloadPage();
    }
    reloadPage(){
        axios.get('/api/reports')
            .then(response =>{
                this.setState({
                    practises: response.data[0],
                    reports: response.data[1],
                })
                //ova provjera je za tvrtke
                if(this.state.practises[0] == undefined){
                    this.setState({
                        errorMessage: 'nema dostupnih izvještaja'
                    })
                }
                else{
                    let arrayPractises = [];
                    let arrayReports = [];
                    this.state.practises.forEach(practise => {
                        this.state.reports.forEach(report => {
                            if(this.state.userRole == 'Tvrtka'){
                                if(practise.candidates[0].id == report.student_id && report.grade == ''){
                                    arrayPractises.push(practise);
                                    arrayReports.push(report);
                                }
                            }
                            else if(this.state.userRole == 'Fakultet'){
                                this.state.students.forEach(student => {
                                    if(practise.candidates[0].id == report.student_id && 
                                        report.grade != '' && student.user_id == report.student_id){
                                        arrayPractises.push(practise);
                                        arrayReports.push(report);
                                    }
                                }); 
                            }
                        });
                    });
                    this.setState({
                        practise: arrayPractises,
                        report: arrayReports,
                    })
                }
                
            }).catch(error =>{
                console.log(error);
            })
    }
    checkFaculty(){
        axios.get('/api/students')
            .then(response =>{
                this.setState({
                    students: response.data
                })  
            }).catch(error =>{
                console.log(error);
            }) 
    }
    render() {
        return (
            <div className="container">
                
                {(this.state.userRole != null)?
                    <MainNavigation role={this.state.userRole}/>
                :null
                }
                <div>
                {   
                this.state.practise[0] != undefined?
                    <Table striped hover className="offset-md-2 col-md-8 offset-md-2">
                        <thead>
                            <tr >
                                <th scope="col">#</th>
                                <th scope="col">Naziv</th>
                                <th scope="col">Početak</th>
                                <th scope="col">Status</th>
                                <th scope="col">Student</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.practise.map((practise, index) =>
                                    <Report key={index} index={index} practise={practise} 
                                    reloadPage={this.reloadPage} report={this.state.report[index]}/>
                            )}
                        </tbody>
                    </Table>
                :<div className="offset-md-3 col-md-6 offset-md-3">
                    <ListGroup>
                        <ListGroupItem>
                            <ListGroupItemHeading>Nema dostupnih izvještaja</ListGroupItemHeading>
                        </ListGroupItem>
                    </ListGroup>
                </div>
                }
                </div>
            </div>
        );
    }
}
export default ReportList;