import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import StudentInfo from './StudentInfo';
import axios from 'axios';

class StudentList extends Component {
    constructor(props){
        super(props);

        this.state = {
            users: [],
            id: this.props.student.id,
            name:  this.props.student.user.name,
            email: this.props.student.user.email,
            indexNumber: this.props.student.indexNumber,
            faculty: this.props.student.faculty,
            study: this.props.student.study,
            course: this.props.student.course,
            yearsOfStudy: this.props.student.yearsOfStudy,
            OIB: this.props.student.OIB,
            user_id: this.props.student.user_id,
            studentInfo: [],
            userInfo: [],
            showRow: true,
            showInfo: false,
            showEdit: false,
            errorMessage: ''
        }

        //this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        
    }
    
    // reloadComponent(){
    //     axios.get('/api/students/'+this.state.id)
    //         .then(response =>{
    //             //console.log(response);
    //             this.setState({
    //                 studentInfo: response.data[1],
    //                 userInfo: response.data[0][0],
    //                 showInfo: true
    //             })
    //             //console.log(this.state.studentInfo);
    //             //console.log(this.state.userInfo);
    //             this.setState({
    //                 name: this.state.userInfo.name,
    //                 //lastName: this.state.studentInfo.lastName,
    //                 indexNumber: this.state.studentInfo.indexNumber,
    //                 faculty: this.state.studentInfo.faculty,
    //                 study: this.state.studentInfo.study,
    //                 course: this.state.studentInfo.course,
    //                 yearsOfStudy: this.state.studentInfo.yearsOfStudy
    //             })
                
    //             //console.log(this.state.studentInfo);
    //         }).catch(error =>{
    //             console.log(error);
    //         })
    // }
    handleEdit(){
        //console.log('edit');

        this.setState({
            showRow: false,
            showInfo: false
        })
        axios.get('/api/students/'+this.state.id+'/edit')
            .then(response =>{
                //console.log(response);
                this.setState({
                    studentInfo: response.data[0],
                    //userInfo: response.data[0][0],
                    showEdit: true
                })
                //console.log(this.state.studentInfo);
                //console.log(this.state.userInfo);
                this.setState({
                    name: this.state.studentInfo.user.name,
                    //lastName: this.state.studentInfo.lastName,
                    user_id: this.state.studentInfo.user_id,
                    indexNumber: this.state.studentInfo.indexNumber,
                    faculty: this.state.studentInfo.faculty,
                    study: this.state.studentInfo.study,
                    course: this.state.studentInfo.course,
                    yearsOfStudy: this.state.studentInfo.yearsOfStudy
                })
                
                //console.log(this.state.user_id);
            }).catch(error =>{
                console.log(error);
            })

    }
    handleShow(){
        //console.log('show');
        //console.log(this.state.id);
        this.setState({
            showRow: false,
            showEdit: false
        })
        axios.get('/api/students/'+this.state.id)
            .then(response =>{
                //console.log(response.data);
                this.setState({
                    studentInfo: response.data[0],
                    //userInfo: response.data[0][0],
                    showInfo: true
                })
                //console.log('student',this.state.studentInfo);
                // console.log('user',this.state.userInfo);
                this.setState({
                    name: this.state.studentInfo.user.name,
                    //lastName: this.state.studentInfo.lastName,
                    indexNumber: this.state.studentInfo.indexNumber,
                    faculty: this.state.studentInfo.faculty,
                    study: this.state.studentInfo.study,
                    course: this.state.studentInfo.course,
                    yearsOfStudy: this.state.studentInfo.yearsOfStudy
                })
                
                //console.log(this.state.studentInfo);
            }).catch(error =>{
                console.log(error);
            })
    }
    handleBack(){
        //console.log('back');
        this.setState({
            showRow: true,
            showInfo: false,
            showEdit: false
        })
    }
    handleChange(e){
        this.setState({ [e.target.name]: e.target.value });
        //console.log(this.state);
    }
    handleUpdate(){
        //console.log('update');
        this.setState({
            errorMessage: ''
        })
        if(this.state.name == '' || this.state.indexNumber == '' || this.state.study == ''||
            this.state.faculty == '' || this.state.course == ''|| this.state.yearsOfStudy == ''){
                this.setState({
                    errorMessage: 'popunite sva polja'
                })
        }
        else{
            axios.post('/api/students/'+this.state.id,{
                _method : 'PUT',
                name: this.state.name,
                user_id: this.state.user_id,
                //lastName: this.state.lastName,
                //email: this.state.email,
                indexNumber: this.state.indexNumber,
                faculty: this.state.faculty,
                course: this.state.course,
                study: this.state.study,
                yearsOfStudy: this.state.yearsOfStudy,
                //OIB: this.state.OIB
            }).then(response =>{
                this.handleBack();
            }).catch(error =>{
                console.log(error);
            })
        }
    }
    
    
    render() {
        return (
            
            this.state.showRow?
                    <tr>
                        
                        <th scope="row">{this.props.index+1}</th>
                        <td>{this.state.name}</td>
                        <td>{this.state.indexNumber}</td>
                        <td>{this.state.faculty}</td>
                        <td>{this.state.study}</td>
                        <td>{this.state.course}</td>
                        <td>{this.state.yearsOfStudy}</td>

                        <td>
                            <button onClick={this.handleShow}>Detaljnije</button>
                        </td>
                        <td>
                            <button onClick={this.handleEdit}>Uredi</button>
                        </td>
                    </tr>

            :this.state.showInfo?
                <tr>
                    <th scope="row">{this.props.index+1}</th>
                    <td>
                        <div>
                            <label><b>Ime i prezime:</b> {this.state.name}</label>
                        </div>
                        <div>
                        <label><b>Email: {this.state.email}</b></label>
                        </div>
                        <div>
                        <label><b>OIB: {this.state.OIB}</b></label>
                        </div>
                        <div>
                           <label><b>Br. indeksa: {this.state.indexNumber}</b></label>
                        </div>
                        <div>
                           <label><b>Fakultet: {this.state.faculty}</b></label>
                        </div>
                        <div>
                           <label><b>Studij: {this.state.study}</b></label>
                        </div>
                        <div>
                           <label><b>Smjer: {this.state.course}</b></label>
                        </div>
                        <div>
                           <label><b>Godina studija: {this.state.yearsOfStudy}</b></label>
                        </div>
                        <button onClick={this.handleBack}>Back</button>
                    </td>
                </tr>
            :this.state.showEdit?
            <tr>
                <th scope="row">{this.props.index+1}</th>
                <td><input 
                    name='name'
                    type='text'
                    value={this.state.name || ''}
                    onChange={this.handleChange}/></td>
                <td><input 
                    name='indexNumber'
                    type='text'
                    value={this.state.indexNumber|| ''}
                    onChange={this.handleChange}/></td>
                <td>{this.state.faculty}</td>
                <td><input 
                    name='study'
                    type='text'
                    value={this.state.study|| ''}
                    onChange={this.handleChange}/></td>
                <td><input 
                    name='course'
                    type='text'
                    value={this.state.course|| ''}
                    onChange={this.handleChange}/></td>
                <td><input 
                    name='yearsOfStudy'
                    type='text'
                    value={this.state.yearsOfStudy|| ''}
                    onChange={this.handleChange}/></td>
                <td><button onClick={this.handleUpdate}>Spremi</button></td>
                <td><div>{this.state.errorMessage}</div></td>
            </tr>
            :null
        );
    }
}
export default StudentList;