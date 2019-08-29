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
            reports: []
        };
        this.reloadPage = this.reloadPage.bind(this);
        this.checkTableRow = this.checkTableRow.bind(this);
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
                    reports: response.data[1]
                })
                //console.log(this.state.practises);
                //console.log(this.state.reports);
                // this.checkTableRow();
            }).catch(error =>{
                console.log(error);
            })
    }
    
    checkTableRow(){
        if($("#myTableId > tbody > tr").length<1){
            this.setState({
                practises: undefined
            })
        }
        //console.log($("#myTableId > tbody > tr").length);

    }
    render() {
        return (
            <div>
                Reports
                {(this.state.userRole != null)?
                    <MainNavigation role={this.state.userRole}/>
                :null
                }
                {this.state.practises != undefined?
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

                            <Report key={index} index={index} practise={practise} reloadPage={this.reloadPage}/>
                        
                        )}
                    </tbody>
                    </table>
                :<span>No results</span>
                }

            </div>
        );
    }
}
export default ReportList;