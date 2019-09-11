import React, { Component } from 'react';
import MainNavigation from './MainNavigation';
import PractiseList from './PractiseList';
import { Button, Table, Input, ListGroup, ListGroupItem, ListGroupItemHeading } from 'reactstrap';
class Practice extends Component {
    constructor(){
        super();
        this.state = {
            userRole: localStorage.getItem('role'),
            id: '',
            name: '',
            description: '',
            company_id: '',
            duration: '',
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
            message: '',
            allpractises: [],
            search: '',

        }
        this.handleCreate = this.handleCreate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.reloadPractises = this.reloadPractises.bind(this);
        this.handleButton = this.handleButton.bind(this);
        this.onClickChange = this.onClickChange.bind(this);
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
                this.setState({
                    createPractice: response.data[0],
                    faculties: response.data[1],
                    showCreate: true
                })
            }).catch(error =>{
                console.log(error);
            })
    }
    handleSubmit(e){
        e.preventDefault();

        //var dateReg = /^\d{2}([.])\d{2}\1\d{4}$/;
        var dataRege = /^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.]\d{4}$/;

        this.setState({
            errorMessage: ''
        })  

        const obj = this.state.faculty;
        var facultyList = Object.keys(obj).filter( function (key) {
            return obj[key]===true;
        });

        if(this.state.name == '' || this.state.description == '' ||
            facultyList == '' || this.state.start == '' || 
            this.state.duration == '' || this.state.status == ''){
            this.setState({
                errorMessage: 'Ispunite sva polja'
            })
        }
        else{
            if(!this.state.start.match(dataRege)){
                this.setState({
                    errorMessage: 'Neispravan format datuma'
                })
            }
            else if(isNaN(this.state.duration) || this.state.duration.length > 1){
                this.setState({
                    errorMessage: 'Neispravano trajanje prakse'
                })
            }
            else{
                axios.post('/api/practise',{
                    name: this.state.name,
                    description: this.state.description,
                    faculties: facultyList,
                    start: this.state.start,
                    duration: this.state.duration,
                    status: this.state.status
                }).then(response =>{
                    this.setState({
                        showCreate: false,
                        showPractises: true,
                        faculty: [],
                        name: '',
                        description: '',
                        faculties: '',
                        start: '',
                        duration: '',
                        status: '',
                    });
                    this.reloadPractises();
                }).catch(error =>{
                    console.log(error);
                })
            }
            
        }
            
    }
    handleButton(){
        this.setState({
            showCreate: false,
            showPractises: true,
            errorMessage: ''
        })
    }
    reloadPractises(){
        axios.get('/api/practise')
            .then(response =>{
                
                this.setState({
                    user: response.data[1][0],
                    practices: response.data[0]
                    
                })
                this.setState({
                    allpractises: this.state.practices
                })

                //dohvati samo prakse koju su u tijeku
                let prakse = [];
                if(this.state.userRole != 'Student'){
                    prakse = this.state.practices.filter(function(practice) {
                        return practice.status !='locked' && practice.status !='grade';
                    });
                }
                else{
                    prakse = this.state.practices.filter(function(practice) {
                        return practice.status =='free';
                    });
                }
                this.setState({
                    practices: prakse
                })

                
                //dohvati prakse koje se odnose na taj faks tj studenta
                
                if(this.state.userRole != 'Tvrtka'){
                    let array =[];
                    let name;
                    if(this.state.userRole == 'Fakultet'){
                        name = this.state.user.user.name;
                    }
                    else{
                        name = this.state.user.faculty;
                    }
                    
                    prakse.forEach((element) => {
                        if(element.faculties.indexOf(name) > -1){
                            array.push(element);
                        }
                    })
                    this.setState({
                        practices: array
                    })
                    
                }
                
                //PROVJERI IMA LI STUDENT PRAKSU
                if(this.state.userRole == 'Student'){
                    this.state.allpractises.forEach((element) => {
                        if(element.status != 'free'){
                            element.faculties.forEach((key) => {
                                if(this.state.user.faculty == key){
                                    element.candidates.forEach((candidate) => {
                                        if(this.state.user.user.id == candidate.id){
                                            
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
                
                if(this.state.practices[0] != undefined){
                    this.setState({
                        message: 'ima rezultata'
                    })
                }
                else{
                    this.setState({
                        message: 'nema rezultata'
                    })
                }
            }).catch(error =>{
                console.log(error);
            })
    }
    handleChange(event){
        this.setState({ [event.target.name] : event.target.value });
    }

    onClickChange(e){
        const val = e.target.checked;
        const name = e.target.name;
        let updateFaculty = Object.assign({},this.state.faculty,{[name]:val})
        this.setState({
            faculty: updateFaculty
        })
    }
    render() {
        let filteredPractises = this.state.practices.filter(
            (practice) => {
                return practice.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );
        return (
            <div className="container">

                {(this.state.userRole != null)?
                    <MainNavigation role={this.state.userRole}/>
                    :null
                }
                <div>
                {(this.state.userRole == 'Tvrtka')?
                    !this.state.showCreate?
                    <Button color="primary" onClick={this.handleCreate}>Kreiraj praksu</Button>
                    :<Button color="primary" onClick={this.handleButton}>Nazad</Button>
                :null
                }
                </div>
                {this.state.showCreate?
                    (this.state.createPractice != [] )?
                        <div className="offset-md-4 col-md-4 offset-md-4">
                            <form>
                                {this.state.createPractice.map((key, index) =>
                                    (key == 'name')?
                                        <div className="form-group" key={index}>
                                            <label className="col-form-label">Naziv</label>
                                            <input 
                                                name='name'
                                                type='text'
                                                className="form-control"
                                                placeholder='Upišite naziv prakse'
                                                value={this.state.name}
                                                onChange={this.handleChange}/>
                                        </div>
                                    :(key == 'description')?
                                        <div className="form-group" key={index}>
                                            <label className="col-form-label">Opis</label>
                                            <textarea 
                                                name='description'
                                                type='text'
                                                className="form-control"
                                                placeholder='Upišite opis prakse'
                                                value={this.state.description}
                                                onChange={this.handleChange}/>
                                        </div>
                                    :(key == 'faculties')?
                                        <div className="form-group" key={index}>
                                            <label className="col-form-label">Fakulteti</label>
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
                                    :(key == 'start')?
                                        <div className="form-group" key={index}>
                                            <label className="col-form-label">Početak</label>
                                                <input 
                                                    name='start'
                                                    type='text'
                                                    className="form-control"
                                                    value={this.state.start}
                                                    onChange={this.handleChange}
                                                    placeholder='Upišite datum u formatu dd.mm.yyyy'/>
                                        </div>
                                    :(key == 'duration')?
                                        <div className="form-group" key={index}>
                                            <label className="col-form-label">Trajanje</label>
                                                <input 
                                                    name='duration'
                                                    type='text'
                                                    className="form-control"
                                                    value={this.state.duration}
                                                    onChange={this.handleChange}
                                                    placeholder='Upišite trajanje prakse u tjednima'/>
                                        </div>
                                    :null
                                )}
                                <Button color="primary" onClick={this.handleSubmit}>Pošalji</Button>
                                <div className="text-danger">{this.state.errorMessage}</div>
                            </form>
                        </div>
                    :null
                :null
                }
                {!this.state.hasPractise?
                    (this.state.showPractises)?
                            (this.state.practices !=undefined && this.state.message == 'ima rezultata')?
                            <div>
                                <div className="offset-md-4 col-md-4 offset-md-4">
                                    <Input
                                        type="text"
                                        name="search"
                                        value={this.state.search}
                                        onChange={this.handleChange}
                                        placeholder="Pretraži praksu"/>
                                </div>
                                <Table striped hover>
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Naziv</th>
                                            <th scope="col">Početak</th>
                                            <th scope="col">Trajanje</th>
                                            <th scope="col">Status</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody> 
                                        {filteredPractises.map((key, index) =>
                                            <PractiseList key={key.id} practice={key} index={index} changeState={this.reloadPractises} user={this.state.user}/>
                                            
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                            :this.state.message == 'nema rezultata'?
                            <div className="offset-md-3 col-md-6 offset-md-3">
                                <ListGroup>
                                    <ListGroupItem>
                                        <ListGroupItemHeading>Nema dostupnih praksi</ListGroupItemHeading>
                                    </ListGroupItem>
                                </ListGroup>
                            </div>
                            :null
                    :null    
                :<div className="offset-md-3 col-md-6 offset-md-3">
                    <ListGroup>
                        <ListGroupItem>
                            <ListGroupItemHeading>Već ste odabrali prasku</ListGroupItemHeading>
                        </ListGroupItem>
                    </ListGroup>
                </div>
                }
            </div>
        );
    }
}
export default Practice;