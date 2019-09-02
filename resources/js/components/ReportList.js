import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MainNavigation from './MainNavigation';
import MyPractise from './MyPractise';
import Report from './Report';


class ReportList extends Component {
    constructor(props){
        super(props);

        this.state = {
            userRole: localStorage.getItem('role'),
            practises: [],
            reports: [],
            errorMessage: '',

        };
        this.reloadPage = this.reloadPage.bind(this);
        this.checkTableRow = this.checkTableRow.bind(this);
        //this.reloadReports = this.reloadReports.bind(this);
    }
    componentDidMount(){
        this.reloadPage();
    }
    reloadPage(){
        axios.get('/api/reports')
            .then(response =>{
                //console.log(response);
                this.setState({
                    practises: response.data[0],
                    reports: response.data[1],
                    //noReport: false
                })

                //ova provjera je za tvrtke
                if(this.state.practises[0] == undefined){
                    this.checkTableRow();
                }
                else{
                    //console.log('nije prazno');
                }
                // console.log(this.state.practises[0]);
                
                //this.checkTableRow();
            }).catch(error =>{
                console.log(error);
            })
    }
    // reloadPage(){
    //     this.reloadReports();
    //     this.checkTableRow();
    // }
    
    checkTableRow(){

        if($("#myTableId > tbody > tr").length<1){
            this.setState({
                errorMessage: 'no results'
            })
        }
        //console.log('check');

    }
    render() {
        return (
            <div className="container">
                
                {(this.state.userRole != null)?
                    <MainNavigation role={this.state.userRole}/>
                :null
                }
                <div>
                {this.state.errorMessage != ''?
                    <div>{this.state.errorMessage}</div>
                :    this.state.practises != undefined?
                    <table id='myTableId'>
                        <thead>
                            <tr >
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Status</th>
                                <th scope="col">Student</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.practises.map((practise, index) =>
                                
                                <Report key={index} index={index} practise={practise} reloadPage={this.reloadPage} 
                                length={this.state.practises.length} check={this.checkTableRow}/>
                                
                            )}
                        </tbody>
                    </table>
                :<span>No results</span>
                }
                </div>
            </div>
        );
    }
}
export default ReportList;