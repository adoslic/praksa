import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Navigation from './Navigation';
import Main from './Main';
import Logout from './Logout';
import Students from './Students';
import Practise from './Practise';
import Profile from './Profile';
import MainNavigation from './MainNavigation';
import PractiseList from './PractiseList';

class MyPractise extends Component {
    constructor(props){
        super(props);

        this.state = {
            userRole: localStorage.getItem('role'),
            id: '',
            file: '',
            user: [],
            practices: [],
            practice: [],
            //report: [],
            showPractise: false,
            hasPractise: false,
            errorMessage: '',
            reports: [],
            href: '',
            practise_id: '',
            message: ''


        };
        this.checkPractise = this.checkPractise.bind(this);
        this.showPractise = this.showPractise.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.download = this.download.bind(this);
        this.showReport = this.showReport.bind(this);
        this.reloadPractise = this.reloadPractise.bind(this);
        this.accept = this.accept.bind(this);
        this.decline = this.decline.bind(this);
    }
    componentDidMount(){
        this.reloadPractise();
        
    }
    reloadPractise(){
        axios.get('/api/practise/')
            .then(response =>{
                //console.log(response);
                this.setState({
                        user: response.data[1][0],
                        practices: response.data[0],
                        showPractise: true
                });
                //console.log(this.state.user);
                //console.log(this.state.practices);
                this.checkPractise();
                this.showPractise();
                this.showReport();
            }).catch(error =>{
                console.log(error);
            })
    }
    checkPractise(){
        this.state.practices.forEach((element) => {
            if(element.status != 'free'){
                element.faculties.forEach((key) => {
                    if(this.state.user.faculty == key){
                        element.candidates.forEach((candidate) => {
                            if(this.state.user.user.id == candidate.id){
                                //console.log(element.id);
                                this.setState({
                                    hasPractise: true,
                                    id: element.id
                                })
                            }
                        })
                    }
                })
            }
        })
    }
    showPractise(){
        //console.log('radi');
        axios.get('/api/practise/'+this.state.id)
            .then(response =>{
                //console.log(response.data);
                this.setState({
                    practice: response.data[0]
                });
                if(this.state.practice.status == 'locked'){
                    this.setState({
                    message: 'practise locked'
                });
                }
                //console.log(this.state.practices);
            }).catch(error =>{
                console.log(error);
            })
        //console.log(this.state.report);
    }
    showReport(){
        axios.get('/api/reports')
            .then(response =>{
                //console.log(response);
                this.setState({
                    //practises: response.data[0],
                    reports: response.data[1]
                })
                //console.log(this.state.practises);
                //console.log(this.state.reports);
                if(this.state.reports != null){
                    this.setState({
                        file: this.state.reports.file,
                        practise_id: this.state.reports.practise_id,
                    })
                }
                //console.log(this.state.file);
            }).catch(error =>{
                console.log(error);
            })
    }
    handleSubmit(e){
        e.preventDefault();
        this.setState({
            message: '',
            errorMessage: ''
        })
        //console.log(this.state.file);
        // if(this.state.report != ''){
        //     let ext = this.state.report.name.split('.').pop();
        //     if(ext == 'doc' || ext == 'docx'){
        //          //CHECK FILE SIZE this.state.report.size
                
        //         axios.post('/api/report',{
        //                 practise_id: this.state.id,
        //                 report: this.state.report
        //             }).then(response =>{
        //                 console.log(response);
        //             }).catch(error =>{
        //                 console.log(error);
        //             })
        //     }
        //     else{
        //         this.setState({
        //         errorMessage: 'invalid file format'
        //         })
        //     }
            
        // }
        // else{
        //     this.setState({
        //         errorMessage: 'you did not select file'
        //     })
            
        // }
        //let file =  this.state.file;
        //const formData = {file: this.state.file}
        //formData.append('file', file);
        //var options = { content: formData };
        
        if(this.state.file != ''){
            // if(this.state.reports != undefined){
            //     var fileName = this.state.reports.file;
            // }
            var formData  = new FormData();
            //var file = this.state.file;
            //var id = this.state.id;
            formData.append('file', this.state.file);
            formData.append('practise_id', this.state.id);
            if(this.state.reports != undefined){
                formData.append('fileName', this.state.reports.file);
            }
            axios.post('/api/reports',
                        // {
                        //     _method : 'PUT',
                            formData
                        // }
                        ,{
                            headers: {
                                processData: false,
                                contentType: false
                            }
                        }
                        ).then(response =>{
                            //console.log(response);
                            this.setState({
                                reports: response.data
                            })
                            this.reloadPractise();
                            this.setState({
                                file: this.state.reports.file,
                                message: 'uspješno slanje dokumenta'
                            })
                            //console.log(this.state.report);
                        }).catch(error =>{
                            console.log(error);
                        })
        }
        else{
            this.setState({
                errorMessage: 'niste odabrali dokument'
            })
        }
        // formData.forEach((value, key) => {
        //     console.log("key %s: value %s", key, value);
        // }) 
            
    }
    onChangeHandler(event){
        let file =  event.target.files[0];
         this.setState({
            file: file
        })
    }
    download(){
        //console.log('download');
        //setTimeout(() => {
            const response = {
                file: '/storage/report/'+this.state.reports.file,
            };
            // server sent the url to the file!
            // now, let's download:
            //window.open(response.file);
            // you could also do:
             //window.location.href = response.file;
            this.setState({
                 href: response.file
            })
        //}, 100);
    }
    accept(){
        //console.log('accept');
        //console.log(this.state.reports.facultyGrade);
        //const facultyGrade = this.state.facultyGrade;
        axios.post('/api/practise/'+this.state.practise_id,{
                    _method : 'PUT',
                    facultyGrade: this.state.reports.facultyGrade,
                }).then(response =>{
                    //console.log(response);
                    this.setState({
                        message: 'practise locked'
                    })
                }).catch(error =>{
                    console.log(error);
                })
    }
    decline(){
        //console.log('decline');
        var id = this.state.id;
        axios.post('/api/reports/'+id,{
                    _method : 'PUT',
                    }).then(response =>{
                        console.log(response);
                        this.reloadPractise();
                        // this.setState({
                        //     reports: response.data
                        // })
                        // this.reloadPractise();
                        // this.setState({
                        //     file: this.state.reports.file
                        // })
                        //console.log(this.state.report);
                    }).catch(error =>{
                        console.log(error);
                    })
    }
    render() {
        return (

            this.state.showPractise?
                <div>
                    MyPractise
                    {(this.state.userRole != null)?
                        <MainNavigation role={this.state.userRole}/>
                    :null
                    }
                    {this.state.message !=''?

                        <div>{this.state.message}</div>

                    :   !this.state.hasPractise?
                            <p>Nemate odabranu praksu</p>
                        :<table>
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Start</th>
                                    <th scope="col">Status</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {(this.state.practice.id != undefined)?
                                    //console.log(this.state.practice)
                                    <PractiseList practice={this.state.practice} user={this.state.user}/>
                                :null
                                }
                            </tbody>
                        </table>
                        }
                    {(this.state.practice.status == 'finished')?
                        <form onSubmit={this.handleSubmit} encType='multipart/form-data'>
                            {this.state.reports != null?
                                <div>
                                    {this.state.reports.file != undefined?
                                        <a href={this.state.href} download onClick={this.download}>{this.state.reports.file}</a>
                                    :null
                                    }
                                    
                                
                                    {this.state.reports.comment != ''?
                                        <div>
                                            <label>Company comment: {this.state.reports.comment}</label>
                                        </div>
                                    :null}
                                    
                                    {this.state.reports.facultyComment != ''?
                                        <div>
                                            <label>Faculty comment: {this.state.reports.facultyComment}</label>
                                        </div>
                                    :null}
                                    
                                    {this.state.reports.facultyGrade != ''?
                                        <div>
                                            <label>Grade: {this.state.reports.facultyGrade}</label>
                                            <a onClick={this.accept}>Accept</a>
                                            <a onClick={this.decline}>Decline</a>
                                        </div>
                                    :null}
                                </div>
                            :null
                            }
                            <label>Upload practise report:</label><br />
                            <input type="file" name="file" onChange={this.onChangeHandler} accept=".doc,.docx"/>
                            <button type="submit">Upload</button>
                            
                            <div>{this.state.errorMessage}</div>
                        </form>

                    : null
                    }
                    {/* {this.state.report.file != undefined?
                        <button onClick={this.download}>Download file</button>
                    :null
                    } */}
                </div>
            :null
        );
    }
}
export default MyPractise;