import React, { Component } from 'react';
import MainNavigation from './MainNavigation';
import PractiseShow from './PractiseShow';
import { Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, 
     Form, FormGroup, Input, Table, FormText } from 'reactstrap';

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
            showPractise: false,
            hasPractise: false,
            errorMessage: '',
            reports: [],
            href: '',
            practise_id: '',
            message: '',
            modalShow: false,

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
        this.toggleShow = this.toggleShow.bind(this);
    }
    componentDidMount(){
        this.reloadPractise();
        
    }
    reloadPractise(){
        axios.get('/api/practise/')
            .then(response =>{
                this.setState({
                        user: response.data[1][0],
                        practices: response.data[0],
                        showPractise: true
                });
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
        axios.get('/api/practise/'+this.state.id)
            .then(response =>{
                this.setState({
                    practice: response.data[0]
                });
                if(this.state.practice.status == 'locked'){
                    this.setState({
                    message: 'Praksa zaključena'
                });
                }
            }).catch(error =>{
                console.log(error);
            })
    }
    showReport(){
        axios.get('/api/reports')
            .then(response =>{
                this.setState({
                    reports: response.data[1]
                })
                if(this.state.reports != null){
                    this.setState({
                        //file: this.state.reports.file,
                        practise_id: this.state.reports.practise_id,
                    })
                }
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
        
        if(this.state.file != ''){
            var formData  = new FormData();
            formData.append('file', this.state.file);
            formData.append('practise_id', this.state.id);
            if(this.state.reports != undefined){
                formData.append('fileName', this.state.reports.file);
            }
            axios.post('/api/reports',
                            formData,
                        {
                            headers: {
                                processData: false,
                                contentType: false
                            }
                        }
                        ).then(response =>{
                            this.setState({
                                reports: response.data
                            })
                            this.reloadPractise();
                            this.setState({
                                file: '',
                                errorMessage: 'Uspješno slanje dokumenta'
                            })
                        }).catch(error =>{
                            console.log(error);
                        })
        }
        else{
            this.setState({
                errorMessage: 'Niste odabrali dokument'
            })
        }
            
    }
    onChangeHandler(event){
        let file =  event.target.files[0];
         this.setState({
            file: file
        })
    }
    download(){
            const response = {
                file: '/storage/report/'+this.state.reports.file,
            };
            this.setState({
                 href: response.file
            })
    }
    accept(){
        axios.post('/api/practise/'+this.state.practise_id,{
                    _method : 'PUT',
                    facultyGrade: this.state.reports.facultyGrade,
                }).then(response =>{
                    this.setState({
                        message: 'Praksa zaključena',
                    })
                    this.reloadPractise();
                }).catch(error =>{
                    console.log(error);
                })
    }
    decline(){
        var id = this.state.id;
        axios.post('/api/reports/'+id,{
                    _method : 'PUT',
                    }).then(response =>{
                        axios.post('/api/practise/'+this.state.practise_id,{
                            _method : 'PUT',
                            status: 'finished',
                            }).then(response =>{
                            }).catch(error =>{
                                console.log(error);
                            })
                        this.reloadPractise();
                    }).catch(error =>{
                        console.log(error);
                    })
    }
    toggleShow() {
        this.setState(prevState => ({
            modalShow: !prevState.modalShow
        }));
    }
    render() {
        return (

            this.state.showPractise?
                <div className="container">
                    
                    {(this.state.userRole != null)?
                        <MainNavigation role={this.state.userRole}/>
                    :null
                    }
                    {this.state.practice.status == 'grade'?
                        <ListGroup className="offset-md-3 col-md-6 offset-md-3">
                        {/* <div> */}
                            
                            {this.state.reports.comment != ''?
                            <ListGroupItem>
                                <ListGroupItemHeading>Komentar tvrtke</ListGroupItemHeading>
                                <ListGroupItemText>
                                    {this.state.reports.comment}
                                </ListGroupItemText>
                                    {/* // <label>Komentar tvrtke: {this.state.reports.comment}</label>
                                // </div> */}
                            </ListGroupItem>    
                            :null}
                            
                            {this.state.reports.facultyComment != ''?
                                <ListGroupItem>
                                    <ListGroupItemHeading>Komentar fakulteta</ListGroupItemHeading>
                                    <ListGroupItemText>
                                        {this.state.reports.facultyComment}
                                    </ListGroupItemText>
                                    {/* // <label>Komentar tvrtke: {this.state.reports.comment}</label>
                                // </div> */}
                                </ListGroupItem>    
                                // <div>
                                //     <label>Komentar fakulteta: {this.state.reports.facultyComment}</label>
                                // </div>
                            :null}
                            <ListGroupItem>
                                <ListGroupItemHeading>Ocjena {this.state.reports.facultyGrade}</ListGroupItemHeading>
                                <ListGroupItemText>
                                    <Button color="primary" onClick={this.accept}>Prihvati</Button>{' '}
                                    <Button color="secondary" onClick={this.decline}>Odbij</Button>
                                </ListGroupItemText>
                            </ListGroupItem>    
                            {/* <label>Ocjena: {this.state.reports.facultyGrade}</label><br/> */}
                            
                        {/* </div> */}
                        </ListGroup>
                    :this.state.message !=''?
                        <ListGroup className="offset-md-3 col-md-6 offset-md-3">
                            <ListGroupItem>

                                <ListGroupItemHeading>{this.state.message}</ListGroupItemHeading>
                                {/* <div>{this.state.message}<br/> */}
                                {(this.state.reports.facultyGrade != '')?
                                    <ListGroupItemText>
                                        {/* <label>Ocjena: {this.state.reports.facultyGrade}</label> */}
                                        Ocjena: {this.state.reports.facultyGrade}
                                    </ListGroupItemText>
                                :null
                                }
                                {/* <br/> */}
                                {/* </div> */}
                            </ListGroupItem>
                        </ListGroup>

                    :   !this.state.hasPractise?
                            <div className="offset-md-4 col-md-4 offset-md-4">
                                <ListGroup>
                                    <ListGroupItem>
                                        <ListGroupItemHeading>Nemate odabranu praksu</ListGroupItemHeading>
                                    </ListGroupItem>
                                </ListGroup>
                            </div>
                        :<Table striped hover className="offset-md-2 col-md-8 offset-md-2">
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
                                <tr>
                                    <td>1</td>
                                    <td>{this.state.practice.name}</td>
                                    <td>{this.state.practice.start}</td>
                                    <td>{this.state.practice.duration}</td>
                                    <td>
                                    {(this.state.practice.status == 'free')?'Slobodno'
                                        :(this.state.practice.status == 'taken')?'Zauzeto'
                                        :(this.state.practice.status == 'finished')?'Odrađeno'
                                        :(this.state.practice.status == 'grade')?'Ocjenjeno'
                                        :(this.state.practice.status == 'locked')?'Zaključana'
                                    :null}
                                    </td>

                                    <td><Button color="primary" onClick={this.toggleShow}>Detaljnije</Button>{' '}</td>
                                </tr>
                            </tbody>
                            
                        </Table>
                        }
                    
                    {(this.state.practice.status == 'finished')?
                    <div className="offset-md-3 col-md-6 offset-md-3">
                        <Form onSubmit={this.handleSubmit} encType='multipart/form-data'>
                            <ListGroup>
                            {this.state.reports != null?
                                <div>
                                    {this.state.reports.file != undefined?
                                        <ListGroupItem>
                                            <ListGroupItemHeading>Izvještaj dostupan na linku</ListGroupItemHeading>
                                            {/* <label>Izvještaj dostupan na linku: </label> */}
                                            <ListGroupItemText>
                                                <a href={this.state.href} download onClick={this.download}>{' '}{this.state.reports.file}</a>
                                            </ListGroupItemText>
                                        </ListGroupItem>
                                    :null
                                    }
                                    
                                
                                    {this.state.reports.comment != ''?
                                        <ListGroupItem>
                                            <ListGroupItemHeading>Komentar tvrtke</ListGroupItemHeading>
                                            {/* <label>Izvještaj dostupan na linku: </label> */}
                                            <ListGroupItemText>
                                                {this.state.reports.comment}
                                            </ListGroupItemText>
                                        </ListGroupItem>
                                        // <div>
                                        //     <Label>Komentar tvrtke: {this.state.reports.comment}</Label>
                                        // </div>
                                    :null}
                                    
                                    {this.state.reports.facultyComment != ''?
                                        <ListGroupItem>
                                            <ListGroupItemHeading>Komentar fakulteta</ListGroupItemHeading>
                                            {/* <label>Izvještaj dostupan na linku: </label> */}
                                            <ListGroupItemText>
                                                {this.state.reports.facultyComment}
                                            </ListGroupItemText>
                                        </ListGroupItem>
                                        // <div>
                                        //     <Label>Komentar fakulteta: {this.state.reports.facultyComment}</Label>
                                        // </div>
                                    :null}
                                </div>
                            :null
                            }
                            <FormGroup>
                                <ListGroupItem>
                                    <ListGroupItemHeading>Odaberite izvještaj</ListGroupItemHeading>
                                    {/* <Label>Odaberite izvještaj</Label> */}
                                    <ListGroupItemText>
                                        <Input type="file" name="file" onChange={this.onChangeHandler} accept=".doc,.docx"/>
                                        <FormText color="muted">
                                            Dozvoljeno je slanje samo doc i docx dokumenata.
                                        </FormText>
                                    </ListGroupItemText>
                                </ListGroupItem>
                                <Button type="submit" color="primary">Pošalji</Button>
                            </FormGroup>
                            {this.state.errorMessage == 'Uspješno slanje dokumenta'?
                            <div className="text-success">{this.state.errorMessage}</div>
                            :<div className="text-danger">{this.state.errorMessage}</div>}
                            
                            </ListGroup>
                        </Form>
                    </div>
                    : null
                    }
                    {this.state.modalShow?
                        <PractiseShow practice={this.state.practice} toggle={this.toggleShow} 
                        user={this.state.user}/>
                    :null}
                </div>
            :null
        );
    }
}
export default MyPractise;