import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MainNavigation from './MainNavigation';
import PractiseList from './PractiseList';

class Practice extends Component {
    constructor(){
        super();
        this.state = {
            userRole: localStorage.getItem('role'),
            id: '',
            name: '',
            description: '',
            company_id: '',
            //faculties: '',
            start: '',
            status: 'free',
            candidates: '',
            practices: [],
            createPractice: [],
            showForm: false,
            showCreate: false,
            showEdit: false,
            showPractises: true,
            errorMessage: '',
            faculty: [],
            faculties: [],
            user: [],
            hasPractise: false,
        }
        this.handleCreate = this.handleCreate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.reloadPractises = this.reloadPractises.bind(this);
        this.handleButton = this.handleButton.bind(this);
        this.changeState = this.changeState.bind(this);
        this.onClickChange = this.onClickChange.bind(this);
        this.checkTableRow = this.checkTableRow.bind(this);
        //this.showStudentPractise = this.showStudentPractise.bind(this);
    }
    componentDidMount(){
        this.reloadPractises();
        
    }
    handleCreate(){
        this.setState({
            showPractises: false,
            showEdit: false
        })
        axios.get('/api/practise/create')
            .then(response =>{
                //console.log(response);
                this.setState({
                    createPractice: response.data[0],
                    faculties: response.data[1],
                    showCreate: true
                })
                //console.log(this.state.faculties);
            }).catch(error =>{
                console.log(error);
            })
    }
    handleSubmit(e){
        e.preventDefault();

        var dateReg = /^\d{2}([.])\d{2}\1\d{4}$/;

        // if(this.state.begin.match(dateReg)) console.log('valja');
        // else console.log('ne valja');

        this.setState({
            errorMessage: ''
        })
        //console.log('submit');
        //console.log(this.state.faculty);  

        const obj = this.state.faculty;
        var facultyList = Object.keys(obj).filter( function (key) {
            return obj[key]===true;
        });

        if(this.state.name == '' || this.state.description == '' ||
            facultyList == '' || this.state.start == '' || this.state.status == ''){
            this.setState({
                errorMessage: 'empty field'
            })
            //console.log(this.state.university);
        }
        else{
            if(!this.state.start.match(dateReg)){
                this.setState({
                    errorMessage: 'invalid date format'
                })
            }
            else{
                
                //console.log(facultyList);

                //console.log(this.state);
                axios.post('/api/practise',{
                    name: this.state.name,
                    description: this.state.description,
                    faculties: facultyList,
                    start: this.state.start,
                    status: this.state.status
                }).then(response =>{
                    //console.log(response.data);
                    this.setState({
                        showCreate: false,
                        showPractises: true,
                        faculty: []
                    });
                    this.reloadPractises();
                    //this.props.history.push('/profile');
                    //console.log(response);
                }).catch(error =>{
                    console.log(error);
                })
            }
            
        }
        //console.log(this.state.faculty);
            
    }
    handleButton(){
        this.setState({
            showCreate: false,
            showPractises: true
        })
        //this.reloadPractises();
    }
    reloadPractises(){
        axios.get('/api/practise')
            .then(response =>{
                //console.log(response.data);
                // if(response.data[1][0] == undefined){
                //     this.setState({
                //         practices: response.data[0],
                //         user: ''
                //     })
                // }
                // else{
                    this.setState({
                        user: response.data[1][0],
                        practices: response.data[0]
                        //showProfile: true
                    })

                //}
                
                //console.log(this.state.user);
                if(this.state.userRole == 'Student'){
                    this.state.practices.forEach((element) => {
                        if(element.status != 'free'){
                            element.faculties.forEach((key) => {
                                if(this.state.user.faculty == key){
                                    element.candidates.forEach((candidate) => {
                                        if(this.state.user.user.id == candidate.id){
                                            //console.log(candidate.name);
                                            this.setState({
                                                hasPractise: true
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
                // if(this.state.userRole == 'Fakultet'){

                // }
                this.checkTableRow();
                //console.log(this.state.user);
                // if(this.state.students != undefined)
                //     this.setState({
                //         id: this.state.students.id
                //     })
                //console.log(this.state.students);
            }).catch(error =>{
                console.log(error);
            })
    }
    handleChange(event){
        this.setState({ [event.target.name] : event.target.value });
    }
    changeState () {
        // this.setState({
        //     showEdit: false,
        //     showProfile: true
        // });
        this.reloadPractises();
    };
    onClickChange(e){
        const val = e.target.checked;
        const name = e.target.name;
        let updateFaculty = Object.assign({},this.state.faculty,{[name]:val})
        this.setState({
            faculty: updateFaculty
        })
        
    }
    //showStudentPractise(key, index){
    //     // key.faculties.forEach(function(element) {
    //     //     if(this.state.user != undefined){
    //     //         let faculty = this.state.user.faculty;
    //     //         if(element == this.state.user.faculty){
    //     //             console.log(this.state.user.faculty)
    //     //         }
    //     //     }
    //     // }).bind(this)
    //     key.faculties.forEach((element) => {
    //         console.log(element);
    //     });
    //return <PractiseList key={key.id} practice={key} index={index} changeState={this.changeState} user={this.state.user}/>
    // }
    checkTableRow(){
        if($("#myTableId > tbody > tr").length<1){
            this.setState({
                practices: undefined
            })
        }
        //console.log($("#myTableId > tbody > tr").length);

    }
    render() {
        return (
            <div className="container">
                
                {/* dohvati sve prakse i prikaži ih u tablici */}

                {(this.state.userRole != null)?
                    <MainNavigation role={this.state.userRole}/>
                    :null
                }
                <div>
                {(this.state.userRole == 'Tvrtka')?
                    !this.state.showCreate?
                    <button type="button" className="btn btn-primary" onClick={this.handleCreate}>Kreiraj praksu</button>
                    :   <button type="button" className="btn btn-primary" onClick={this.handleButton}>Nazad</button>
                :null
                }
                </div>
                {this.state.showCreate?
                    (this.state.createPractice != [] )?
                        <div className="offset-md-3 col-md-6 offset-md-3">
                            <form>
                                {this.state.createPractice.map((key, index) =>
                                    (key != 'id' && key != 'created_at' && key != 'updated_at' && 
                                    key != 'company_id' && key != 'candidates' && key != 'faculties' && key != 'status')?
                                        
                                        <div key={index}>
                                        <label className="col-form-label">{key}:</label>
                                        {(key == 'start')?
                                            <input 
                                                name={key}
                                                // value={this.state.profileValue[index]}
                                                value={this.state.key}
                                                onChange={this.handleChange}
                                                placeholder='dd.mm.yyyy'/>
                                            :<input 
                                                name={key}
                                                // value={this.state.profileValue[index]}
                                                value={this.state.key}
                                                onChange={this.handleChange}
                                                //placeholder={key}
                                                />
                                        }
                                        </div>    
                                    :(key === 'faculties')?
                                        <div key={index}>
                                            <label className="col-form-label">{key}:</label>
                                            {this.state.faculties.map((faculty, i) =>
                                            <div className="form-check" key={i}>
                                                <input 
                                                    type="checkbox" 
                                                    name={faculty.name} 
                                                    className="form-check-input"
                                                    onChange={this.onClickChange}
                                                    value={this.state.faculty[i]}/>
                                                <label className="form-check-label">{faculty.name}</label>
                                            </div>
                                            )}  
                                        </div>  
                                    :null
                                )}
                                {/* {console.log(this.state.faculty)} */}
                                {/* {this.state.showCreate? */}
                                    <button className="btn btn-primary" onClick={this.handleSubmit}>Pošalji</button>
                                    <div>{this.state.errorMessage}</div>
                                {/* :null} */}
                            </form>
                        </div>
                    :null
                :null
                }
                {!this.state.hasPractise?
                    (this.state.showPractises)?
                        // this.state.practices.length > 1?
                            (this.state.practices !=undefined)?
                            <div className="offset-md-3 col-md-6 offset-md-3">
                                <table id='myTableId'>
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Description</th>
                                            {/* <th scope="col">Fakulteti</th> */}
                                            <th scope="col">Start</th>
                                            <th scope="col">Status</th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody> 
                                    {this.state.practices.map((key, index) =>
                                        
                                        //(this.state.userRole == 'Student')?
                                        //     // key.faculties.forEach(function(element) {
                                        //     //     //if(this.state.user != undefined){
                                        //     //         // let faculty = this.state.user.faculty;
                                        //     //         // if(element == this.state.user.faculty){
                                        //     //              console.log(this.state.user.faculty)
                                        //     //         // }
                                        //     //     //}
                                        //     // }).bind(this)
                                        //     //

                                            // key.faculties.map((element) => {
                                                //this.showStudentPractise(key, index)
                                        //         if(element == this.state.user.faculty){
                                        //             console.log('key', key);
                                        //             // console.log('index',index);
                                        //             // console.log('user', this.state.user);
                                        //             //<PractiseList key={key.id} practice={key} index={index} changeState={this.changeState} user={this.state.user}/>
                                                    
                                        //         }
                                        //<PractiseList key={key.id} practice={key} index={index} changeState={this.changeState} user={this.state.user}/>
                                            //})
                                        
                                        //:
                                        (index != undefined && key.status != 'locked' && key.status != 'grade')?
                                        //console.log(key.status)
                                            <PractiseList key={key.id} practice={key} index={index} changeState={this.changeState} user={this.state.user}/>
                                        :null    
                                            //console.log(key.id)
                                    )}
                                    {/* {this.state.noResult?
                                        // <tr>
                                        //     <td>No results</td>
                                        // </tr>
                                        //<tr><td><span>No results</span></td></tr>
                                    :null} */}

                                    </tbody>
                                </table>
                                {/* {($("#myTableId > tbody > tr").length<1)?
                                        // console.log('no results')
                                        //CALL FUNCTION
                                        this.checkTableRow()
                                    :null
                                    } */}
                            </div>
                            :<div className="offset-md-3 col-md-6 offset-md-3">No results</div>
                            
                        // <button onClick={this.handleCreate}>Kreirajte profil</button>
                        // :<span>No results</span>
                    :null    
                :<div>
                    <h3>Već ste odabrali praksu</h3>
                </div>
                }
                {
                    // console.log($("#myTableId > tbody > tr").length)
                    
                    
                }
            </div>
        );
    }
}
export default Practice;