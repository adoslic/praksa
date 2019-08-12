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
            email : '',
            role : 'Student',
            password : '',
            userRole: localStorage.getItem('role')
            //showNav: false
        }
        this.handleButton = this.handleButton.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
            axios.post('/api/register',{
                name: this.state.name,
                email: this.state.email,
                role: this.state.role,
                password: this.state.password,
            }).then(response =>{
                this.setState({
                    showForm: false,
                    name: '',
                    email : '',
                    password : ''
                })
                //console.log(response);
                //this.props.history.push('/main');
                
            }).catch(error =>{
                console.log(error);
            })
    }
    // componentDidMount(){
    //     this.setState({
    //         role: localStorage.getItem('role'),
    //         showNav: true
    //     })
    // }


    render() {
        return (
            <div>
                {/* dohvati sve studente i prikaži ih u tablici */}
                students
                {(this.state.userRole != null)?
                    <MainNavigation role={this.state.userRole}/>
                    :null
                }

                <button onClick={this.handleButton}>Dodaj studenta</button>
                
                {this.state.showForm?
                    <form onSubmit={this.handleSubmit}>
                        
                        <h3>Add student</h3>
                        <input 
                            type="name" 
                            name="name" 
                            placeholder="enter student name" 
                            value={this.state.name}
                            onChange={this.handleChange}/>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="enter student email" 
                            value={this.state.email}
                            onChange={this.handleChange}/>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="enter password" 
                            value={this.state.password}
                            onChange={this.handleChange}/> 

                        <button type="submit">Register</button>
                    </form>:
                    <StudentList/>
                }

            </div>
        );
    }
}
export default Students;