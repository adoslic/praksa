import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MainNavigation from './MainNavigation';
import MyPractise from './MyPractise';


class Report extends Component {
    constructor(props){
        super(props);

        this.state = {
            userRole: localStorage.getItem('role'),
            id: this.props.practise.id,
            name: this.props.practise.name,
            description: this.props.practise.description,
            //comment: this.props.practise.comment,
            status: this.props.practise.status,
            faculties: [],
            faculty: false,
            report: [],
            showReport: false,
            showPractise: true,
            href: '',
            //fileName: '',
            file: '',
            grade: '',
            comment: '',
            studentName: this.props.practise.candidates[0].name,
            graded: false,
            facultyComment: '',
            facultyGrade: '',
            

        };
        //this.reloadPage = this.reloadPage.bind(this);
        this.showButtonReport = this.showButtonReport.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.download = this.download.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.checkFaculty = this.checkFaculty.bind(this);
    }
    
    componentDidMount(){
        this.checkReport();
    }
    showButtonReport(){
        //console.log('show report');
        //UHVATI IME FAJLA I POSTAVI GA U BUTTON DA SE MOŽE SKINIT
        //OMOGUĆI UPLOAD NOVOG (ISPRAVLJENOG) FAJLA POD ISTIM IMENOM KOJE JE I BILO
        
        this.setState({
            showReport: true,
            showPractise: false,
        })
    }
    // isGraded(){
    //     this.props.noGradedReports.forEach(element => {
    //         if(element.id == this.state.id){
    //             if(element.grade != ''){
    //                 this.setState({
    //                     graded: true
    //                 })
    //             }
    //         }
    //     });
    // }
    checkReport(){
        //console.log('check report');
        //this.isGraded();
        axios.get('/api/reports/'+this.state.id)
            .then(response =>{
                //console.log(response);
                this.setState({
                    report: response.data
                });
                //console.log(this.state.report);
                if(this.state.report.grade != undefined && this.state.report.grade != ''){
                    //console.log(this.state.report.student_id);
                    this.setState({
                        graded: true
                    })
                    this.checkFaculty();
                }
                this.setState({
                    grade: this.state.report.grade,
                    comment: this.state.report.comment,
                    facultyGrade: this.state.report.facultyGrade,
                    facultyComment: this.state.report.facultyComment,
                });
                
            }).catch(error =>{
                console.log(error);
            })
        
    }
    checkFaculty(){
        axios.get('/api/students')
            .then(response =>{
                //console.log(response);
                this.setState({
                    faculties: response.data
                }) 
                //console.log(this.state.faculties);
                this.state.faculties.forEach(element => {
                    //console.log(element.user_id);
                    if(element.user_id == this.state.report.student_id){
                        this.setState({
                            faculty: true
                        }) 
                    }
                });
            }).catch(error =>{
                console.log(error);
            })

        
    }
    handleBack(){
        //console.log('back');
        this.setState({
            showReport: false,
            showPractise: true,
            grade: '',
            comment: '',
        });
        this.props.reloadPage();
    }
    download(){
        //console.log('download');
        //setTimeout(() => {
            const response = {
            file: '/storage/report/'+this.state.report.file,
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
    handleSubmit(e){
        e.preventDefault();
        //console.log('submit');
        var formData  = new FormData();
        var file = this.state.file;
        var fileName = this.state.report.file;
        var grade = this.state.grade;
        var comment = this.state.comment;
        var facultyGrade = this.state.facultyGrade;
        var facultyComment = this.state.facultyComment;
        formData.append('file', file);
        formData.append('_method', 'PUT');
        formData.append('fileName', fileName);
        formData.append('grade', grade);
        formData.append('comment', comment);
        formData.append('facultyGrade', facultyGrade);
        formData.append('facultyComment', facultyComment);

        axios.post('/api/reports/'+this.state.id,
                    formData,{
                    headers: {
                            processData: false,
                            contentType: false
                        }
                    }
                    ).then(response =>{
                        // console.log(response);
                        this.setState({
                            report: response.data
                        })
                        //console.log(this.state.report);
                        
                        if(this.state.report.grade != ''){
                            this.setState({
                                graded: true
                            })
                        }
                        this.handleBack();
                        //console.log(this.state.report);
                    }).catch(error =>{
                        console.log(error);
                    })
    }
    onChangeHandler(event){
        let file =  event.target.files[0];
         this.setState({
            file: file
        })
    }
    handleChange(event){
        this.setState({ [event.target.name] : event.target.value });
    }
    render() {
        return (
            this.state.userRole == 'Tvrtka' && !this.state.graded?
                this.state.showPractise?
                        <tr>
                            {/* <td>{this.props.index+1}</td> */}
                            <td></td>
                            <td>{this.state.name}</td>
                            <td>{this.state.description}</td>
                            <td>{this.state.status}</td>
                            <td>{this.state.studentName}</td>
                            {/* ISPIS FAJLA (IZVJEŠTAJA) 
                                AK IMA IZVJEŠTAJ ONDA OMOGUĆI SHOW REPORT
                                KOD SHOW REPORTA OMOGUĆI DOWNLOAD BUTTON I UPLOAD NOVOG FAJLA KOJI ĆE OVERRAJDAT STARI
                            */}
                                {this.state.report.id != undefined?
                                    <td><button onClick={this.showButtonReport}>SHOW REPORT</button></td>
                                :<td>No report</td>
                                }
                        </tr>   
                :this.state.showReport?
                    <tr>   
                        <td>
                            {/* <div>{this.props.index+1}</div> */}
                            {/* <div>practise name:{this.state.name}</div> */}
                            <div>
                                {/* <button onClick={this.download}>Download report</button> */}
                                <a href={this.state.href} download onClick={this.download}>{this.state.report.file}</a>
                            </div>
                            <div>
                                <form onSubmit={this.handleSubmit} encType='multipart/form-data'>
                                        <div>
                                            <label>Grade: </label>
                                            <input 
                                                type='text' 
                                                name='grade' 
                                                value={this.state.grade}
                                                onChange={this.handleChange}/>
                                        </div>
                                        <div>
                                            <label>Comment: </label>
                                            <input 
                                                type='text' 
                                                name='comment' 
                                                value={this.state.comment}
                                                onChange={this.handleChange}/>
                                        </div>
                                        <div>
                                            <label>Upload practise report:</label><br />
                                            <input type="file" name="file" onChange={this.onChangeHandler} accept=".doc,.docx"/><br />
                                        </div>
                                        <button type="submit">Upload</button>
                                        <div>{this.state.errorMessage}</div>
                                </form>
                                <button onClick={this.handleBack}>Back</button>
                            </div>
                        </td>
                    </tr>
                :null
            :this.state.userRole == 'Fakultet' && this.state.graded && this.state.faculty?   
                this.state.showPractise?
                        <tr>
                            {/* <td>{this.props.index+1}</td> */}
                            <td></td>
                            <td>{this.state.name}</td>
                            <td>{this.state.description}</td>
                            <td>{this.state.status}</td>
                            <td>{this.state.studentName}</td>
                            {/* ISPIS FAJLA (IZVJEŠTAJA) 
                                AK IMA IZVJEŠTAJ ONDA OMOGUĆI SHOW REPORT
                                KOD SHOW REPORTA OMOGUĆI DOWNLOAD BUTTON I UPLOAD NOVOG FAJLA KOJI ĆE OVERRAJDAT STARI
                            */}
                                {this.state.report.id != undefined?
                                    <td><button onClick={this.showButtonReport}>SHOW REPORT</button></td>
                                :<td>No report</td>
                                }
                        </tr>   
                :this.state.showReport?
                    <tr>   
                        <td>
                            {/* <div>{this.props.index+1}</div> */}
                            {/* <div>practise name:{this.state.name}</div> */}
                            <div>
                                {/* <button onClick={this.download}>Download report</button> */}
                                <a href={this.state.href} download onClick={this.download}>{this.state.report.file}</a>
                            </div>
                            <div>
                                <form onSubmit={this.handleSubmit} encType='multipart/form-data'>
                                        <div><label>Company grade: {this.state.grade}</label></div>
                                        <div><label>Company comment: {this.state.comment}</label></div>
                                        <div>
                                            <label>Grade: </label>
                                            <input 
                                                type='text' 
                                                name='facultyGrade' 
                                                value={this.state.facultyGrade}
                                                onChange={this.handleChange}/>
                                        </div>
                                        <div>
                                            <label>Comment: </label>
                                            <input 
                                                type='text' 
                                                name='facultyComment' 
                                                value={this.state.facultyComment}
                                                onChange={this.handleChange}/>
                                        </div>
                                        <div>
                                            <label>Upload practise report:</label><br />
                                            <input type="file" name="file" onChange={this.onChangeHandler} accept=".doc,.docx"/><br />
                                        </div>
                                        <button type="submit">Upload</button>
                                        <div>{this.state.errorMessage}</div>
                                </form>
                                <button onClick={this.handleBack}>Back</button>
                            </div>
                        </td>
                    </tr>
                :null
            :null
        );
    }
}
export default Report;