import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import StudentList from './StudentList';
import MainNavigation from './MainNavigation';

class Students extends Component {
    constructor(){
        super();
        this.state = {
            showForm: false,
            name: '',
            //lastName: '',
            indexNumber: '',
            email : '',
            role : 'Student',
            password : '',
            course: '',
            study: '',
            yearsOfStudy: '',
            userRole: localStorage.getItem('role'),
            students: [],
            //users: [],
            id: '',
            show: true,
            errorMessage: ''
            //showNav: false
        }
        this.handleButton = this.handleButton.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.refreshStudents = this.refreshStudents.bind(this);
        
    }
    handleButton(){
        this.setState(prevState => ({
            showForm: !prevState.showForm
        }));
    }
    handleChange(e){
        this.setState({ [e.target.name]: e.target.value });
        //console.log(this.state);
    }
    handleSubmit(e){
        e.preventDefault();
        //console.log(this.state);
        this.setState({
            errorMessage: ''
        })
        if(this.state.name == '' || this.state.indexNumber == '' || this.state.study == '' ||
            this.state.course == '' || this.state.yearsOfStudy == '' ||
            this.state.email == '' || this.state.password == ''){
                this.setState({
                    errorMessage: 'popunite sva polja'
                })
        }
        else{
            if(this.state.password.length < 8){
                this.setState({
                    errorMessage: 'lozinka mora sadržavati barem 8 znakova'
                })
            }
            else{
                axios.post('/api/register',{
                    name: this.state.name,
                    email: this.state.email,
                    role: this.state.role,
                    password: this.state.password,
                }).then(response =>{
                    //console.log(response.data);
                    this.setState({
                        showForm: false,
                        id: response.data.id
                    })
                    //console.log(this.state.id);
                    //this.props.history.push('/main');
                    
                }).then((response) => {
                    return axios.post('/api/students',{
                        //name: this.state.name,
                        //lastName: this.state.lastName,
                        indexNumber: this.state.indexNumber,
                        study: this.state.study,
                        course: this.state.course,
                        yearsOfStudy: this.state.yearsOfStudy,
                        //email: this.state.email,
                        user_id: this.state.id
                    }) 
                })
                .then((response) => {
                    //console.log('Response', response);
                    this.setState({
                        name: '',
                        //indexNumber: '',
                        email: '',
                        yearsOfStudy: '',
                        course: '',
                        study: '',
                        indexNumber: '',
                        password: ''
                    })
                    this.refreshStudents();
                }).catch(error =>{
                    console.log(error);
                    this.setState({
                        errorMessage: 'postoji korisnik s tom email adresom'
                    })
                });
            }
        }
            //console.log(this.state.id);

            // axios.post('/api/students',{
            //     name: this.state.name,
            //     lastName: this.state.lastName,
            //     indexNumber: this.state.indexNumber,
            //     email: this.state.email,
            //     user_id: this.state.id
            // })
            // .then(response =>{
            //     console.log(response);
                
            // }).catch(error =>{
            //     console.log(error);
            // })
    }
    componentWillMount(){
        axios.get('/api/students')
            .then(response =>{
                //console.log(response);
                this.setState({
                    //users: response.data[0],
                    students: response.data
                    //showProfile: true
                })
                //console.log(this.state.students);
                //console.log(this.state.users[0]);
                // if(this.state.students != undefined)
                //     this.setState({
                //         id: this.state.students.id
                //     })
                //console.log(this.state.students);
            }).catch(error =>{
                console.log(error);
            })
    }
    refreshStudents() {
        axios.get('/api/students')
            .then(response =>{
                //console.log(response);
                this.setState({
                    students: response.data
                })
                
            }).catch(error =>{
                console.log(error);
            })
      }


    render() {
        return (
            <div>
                {/* dohvati sve studente i prikaži ih u tablici */}
                students
                {(this.state.userRole != null)?
                    <MainNavigation role={this.state.userRole}/>
                    :null
                }
                {!this.state.showForm?
                    <button onClick={this.handleButton}>Dodaj studenta</button>
                :   <button onClick={this.handleButton}>Nazad</button>
                }
                {this.state.showForm?
                    <form onSubmit={this.handleSubmit}>
                        {/* <input type="hidden" name="csrf-token" value="{{{ csrf_token() }}}" /> */}
                        
                        <input 
                            name='name'
                            type='text'
                            placeholder='enter student name'
                            value={this.state.name}
                            onChange={this.handleChange}/>
                        <input 
                            name="indexNumber"
                            type="text" 
                            placeholder="enter index number" 
                            value={this.state.indexNumber}
                            onChange={this.handleChange}/>
                        <input 
                            name="email"
                            type="email" 
                            placeholder="enter student email" 
                            value={this.state.email}
                            onChange={this.handleChange}/>
                        <input 
                            name="study"
                            type="text" 
                            placeholder="enter student study" 
                            value={this.state.study}
                            onChange={this.handleChange}/>
                        <input 
                            name="course"
                            type="text" 
                            placeholder="enter student course" 
                            value={this.state.course}
                            onChange={this.handleChange}/>
                        <input 
                            name="yearsOfStudy"
                            type="text" 
                            placeholder="enter yearsOfStudy" 
                            value={this.state.yearsOfStudy}
                            onChange={this.handleChange}/>
                        <input 
                            name="password" 
                            type="password"
                            autoComplete="on"
                            placeholder="enter password" 
                            value={this.state.password}
                            onChange={this.handleChange}/> 

                        <button type='submit'>Registriraj</button>
                        <div>{this.state.errorMessage}</div>
                    </form>:
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Ime</th>
                                {/* <th scope="col">Prezime</th> */}
                                <th scope="col">Broj indeksa</th>
                                <th scope="col">Fakultet</th>
                                <th scope="col">Studij</th>
                                <th scope="col">Smjer</th>
                                <th scope="col">Godina studija</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                {/* <th scope="col"></th> */}
                            </tr>
                        </thead>
                        <tbody> 
                        {this.state.students.map((key, index) =>
                            //this.state.users
                            <StudentList key={index} student={key} index={index} />
                            //console.log(key[index])
                                
                        )}
                        </tbody>
                    </table>
                       
                    
                    
                }

            </div>
        );
    }
}
export default Students;