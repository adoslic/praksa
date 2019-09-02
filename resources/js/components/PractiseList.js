import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MainNavigation from './MainNavigation';
import ProfileList from './ProfileList';
import Candidate from './Candidate';

class PractiseList extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: this.props.user || '',
            userRole: localStorage.getItem('role'),
            id: this.props.practice.id,
            name:  this.props.practice.name,
            //email: this.props.practice.user.email,
            description: this.props.practice.description,
            faculties: this.props.practice.faculties,
            start: this.props.practice.start,
            status: this.props.practice.status,
            candidates: this.props.practice.candidates,
            company_id: this.props.practice.company_id,

            profile:[],
            practiceInfo: [],
            List: [],
            faculty: [],
            applied: false,
            allowed: false,
            mypractise: false,

            showRow: true,
            showInfo: false,
            showEdit: false,
            showProfile: false,

            errorMessage: ''
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.checkFaculty = this.checkFaculty.bind(this);
        this.onClickChange = this.onClickChange.bind(this);
        this.handleApply = this.handleApply.bind(this);
        this.checkApply = this.checkApply.bind(this);
        this.handleUnapply = this.handleUnapply.bind(this);
        this.checkUserRole = this.checkUserRole.bind(this);
        this.hideProfile = this.hideProfile.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
    }
    handleShow(){
        //console.log('show');
        //console.log(this.state.id);
        this.setState({
            showRow: false,
            showEdit: false
        })
        axios.get('/api/practise/'+this.state.id)
            .then(response =>{
                //console.log(response.data);
                this.setState({
                    practiceInfo: response.data[0],
                    //userInfo: response.data[0][0],
                    showInfo: true
                })
                //console.log('student',this.state.practiceInfo);
                // console.log('user',this.state.userInfo);

                this.setState({
                    id: this.state.practiceInfo.id,
                    name: this.state.practiceInfo.name,
                    //lastName: this.state.practiceInfo.lastName,
                    description: this.state.practiceInfo.description,
                    faculties: this.state.practiceInfo.faculties,
                    start: this.state.practiceInfo.start,
                    status: this.state.practiceInfo.status,
                    company_id: this.state.practiceInfo.company_id,
                    candidates: this.state.practiceInfo.candidates
                })
                //console.log(this.state.faculties.length());
                //console.log(this.state.candidates[0].name);
            }).catch(error =>{
                console.log(error);
            })
    }
    handleEdit(){
        //console.log('edit');

        this.setState({
            showRow: false,
            showInfo: false
        })
        axios.get('/api/practise/'+this.state.id+'/edit')
            .then(response =>{
                //console.log(response);
                this.setState({
                    practiceInfo: response.data[0][0],
                    List: response.data[1],
                    showEdit: true
                })
                //console.log(this.state.practiceInfo);
                //console.log(this.state.facultyList);
                this.setState({
                    id: this.state.practiceInfo.id,
                    name: this.state.practiceInfo.name,
                    //lastName: this.state.practiceInfo.lastName,
                    description: this.state.practiceInfo.description,
                    faculties: this.state.practiceInfo.faculties,
                    start: this.state.practiceInfo.start,
                    status: this.state.practiceInfo.status,
                    company_id: this.state.practiceInfo.company_id,
                    candidates: this.state.practiceInfo.candidates
                })
                let obj = {};
                this.state.faculties.map((faculty, index) =>
                    obj[faculty] = true
                )
                this.setState({
                    faculty : obj
                })
                //console.log(this.state.faculty);
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
        if(this.props.index != undefined){
            this.props.changeState();
        }
        
    }
    handleChange(e){
        this.setState({ [e.target.name] : e.target.value });
    }
    handleUpdate(){
        //console.log('update');
        // console.log('list', this.state.List);
        // console.log('faculties', this.state.faculties);
        //console.log('faculty', this.state.faculty);

        var dateReg = /^\d{2}([.])\d{2}\1\d{4}$/;

        this.setState({
            errorMessage: ''
        })
        const obj = this.state.faculty;
        var fList = Object.keys(obj).filter( function (key) {
            return obj[key]===true;
        });

        if(this.state.name == '' || this.state.description == '' || fList == ''||
            this.state.start == '' || this.state.status == ''){
                this.setState({
                    errorMessage: 'popunite sva polja'
                })
        }
        else{
            if(!this.state.start.match(dateReg)){
                this.setState({
                    errorMessage: 'invalid date format'
                })
            }
            else{
                //console.log(this.state.faculty);
                // const obj = this.state.faculty;
                // var fList = Object.keys(obj).filter( function (key) {
                //     return obj[key]===true;
                // });
                //console.log(fList);
                axios.post('/api/practise/'+this.state.id,{
                    _method : 'PUT',
                    name: this.state.name,
                    company_id: this.state.company_id,
                    //lastName: this.state.lastName,
                    //email: this.state.email,
                    description: this.state.description,
                    faculties: fList,
                    start: this.state.start,
                    status: this.state.status,
                    candidates: this.state.candidates
                }).then(response =>{
                    //console.log(response.data.status);
                    this.setState({
                        status: response.data.status
                    })
                    // this.props.changeState();
                    this.handleBack();
                }).catch(error =>{
                    console.log(error);
                })
            }
        }
    }
    handleDelete(){
        axios.delete('/api/practise/'+this.state.id)
            .then(response =>{
                //console.log(response);
                this.props.changeState();
                this.handleBack();
            }).catch(error =>{
                console.log(error);
            })
    }
    checkFaculty(name){
        // let data = false;
        // this.state.faculties.map((faculty, index) =>
        //     (name == faculty)? data = true : null
        // )
        // return data;
        //console.log(this.state.faculty);
            const obj = this.state.faculty;
            if(obj.hasOwnProperty(name)){
                return obj[name];
            }
            //Object.values(obj)
            return false;
            // var fList = Object.keys(obj).filter( function (key) {
            //     return obj[key]===true;
            // });
    }
    onClickChange(e){
        const val = e.target.checked;
        const name = e.target.name;
        let updateFaculty = Object.assign({},this.state.faculty,{[name]:val})
        this.setState({
            faculty: updateFaculty
        })
        //console.log(this.state.faculty);
    }
    handleApply(e){
        //console.log(this.state.candidates);
        let array = this.state.candidates;
        var obj = {
                id: this.state.user.user.id,
                name: this.state.user.user.name,
                email: this.state.user.user.email
            };
        array.push(obj);
        //console.log(array);
        // let array = this.state.candidates;
        // array.push(this.state.userName);
        //console.log(array);

        axios.post('/api/practise/'+this.state.id,{
                    _method : 'PUT',
                    candidates: array
                }).then(response =>{
                    //console.log(response);
                    // if(response.data == 'already applied'){
                    //     this.setState({
                    //         errorMessage: response.data
                    //     })
                    // }
                    // else{
                        this.setState({
                            applied: true
                        })
                    //}
                    // this.props.changeState();
                    //this.handleBack();
                }).catch(error =>{
                    console.log(error);
                })
        //this.props.changeState();
        //console.log(this.state.userName)
    }
    componentDidMount(){
        
        this.checkUserRole();

        this.checkApply();
    }
    checkApply(){
        if(this.props.index == undefined){
            this.setState({
                mypractise : true
            })
        }
        else{
            let user = this.state.user.user;
            //let i;
            //console.log('name1',name);
            this.state.candidates.forEach((key) => {
                //console.log(key);
                // console.log('key',key);
                // console.log('name',name);
                if(key != null && key.id == user.id){
                    //console.log(key);
                    this.setState({
                        applied : true
                    })
                }
            });
        }
            
        //console.log(this.state.user.user);
    }
    handleUnapply(){
        //console.log('unapply');
        let array = this.state.candidates;
        let user = this.state.user.user;

        var index = array.findIndex(x => x.id === user.id);
        //console.log(index);
        if (index > -1) {
            array.splice(index, 1);
            //console.log(array);
            axios.post('/api/practise/'+this.state.id,{
                    _method : 'PUT',
                    candidates: array
                }).then(response =>{
                    //console.log(response);
                    
                    this.setState({
                        applied: false
                    })
                    
                    // this.props.changeState();
                    this.handleBack();
                }).catch(error =>{
                    console.log(error);
                })
        }
    }
    checkUserRole(){
            
        if(this.state.userRole == 'Student'){
            if(this.props.index == undefined){
                //console.log('my practise');
                this.setState({
                    allowed: true
                })
                // this.state.faculties.forEach((element) => {
                //     //console.log(element)
                //     // if(element == this.state.user.faculty && this.state.status == 'free'){
                //     //     //console.log('free');
                //     //     this.setState({
                //     //         allowed: true
                //     //     })
                //     // }
                //})

            }
            else{
                //console.log('practises');

                this.state.faculties.forEach((element) => {
                    //console.log(this.state.user.faculty)
                    if(element == this.state.user.faculty && this.state.status == 'free'){
                        //console.log('free');
                        this.setState({
                            allowed: true
                        })
                    }
                })
            }
        }
        else if(this.state.userRole == 'Fakultet'){
            this.state.faculties.forEach((element) => {
                    // console.log(this.props.user.user.name);
                    // console.log(element);
                    //if(this.state.user != undefined){
                        if(element == this.props.user.user.name){
                            //console.log('free');
                            this.setState({
                                allowed: true
                            })
                        }
                    //}
            })
        }
        else{
            this.setState({
                allowed: true
            })
        }
        
    }
    showProfile(id){
        //console.log(id);
        axios.get('/api/profile/'+id)
            .then(response =>{
                //console.log(response);
                this.setState({
                    profile: response.data[0],
                    showProfile: true
                })
                //console.log(this.state.profile);
            }).catch(error =>{
                console.log(error);
            })
    }
    hideProfile(){
        //console.log('hide');
        this.setState({
            showProfile: false
        })
    }
    changeStatus(value){
        this.setState({
            status: value
        })
    }
    render() {
        // if(this.state.userRole == 'Student' && !this.state.allowed){
        //     return null;
        // }
        // else{
            return (
                this.state.allowed?
                    this.state.showRow?
                        <tr>  
                            <th scope="row"></th>
                            <td>{this.state.name}</td>
                            <td>{this.state.description}</td>
                            {/* <td>
                                <ul>
                                {this.state.faculties.map((faculty, index) =>
                                <li key={index}>{faculty}</li>
                                )}
                                </ul>
                            </td> */}
                            <td>{this.state.start}</td>
                            <td>{this.state.status}</td>

                            <td>
                                <button onClick={this.handleShow}>Show</button>
                            </td>
                            {(this.state.userRole == 'Tvrtka')?
                                <td>
                                    <button onClick={this.handleEdit}>Edit</button>
                                </td>
                                :null
                            }
                            {(this.state.userRole == 'Tvrtka')?
                                <td>
                                    <button onClick={this.handleDelete}>Delete</button>
                                </td>
                                :null
                            }
                            {(this.state.userRole == 'Student' && !this.state.mypractise)?
                                (!this.state.applied)?
                                <td>
                                    <button onClick={this.handleApply}>Apply</button>
                                </td>
                                :<td>
                                    <button onClick={this.handleUnapply}>Unapply </button>
                                </td>
                            :null
                            }
                            <td><div>{this.state.errorMessage}</div></td>
                        </tr>
                    :this.state.showInfo?
                    
                        <tr>
                            <th scope="row"><h1>{}</h1></th>
                            <td>
                                <div>
                                    <label><b>name:</b> {this.state.name}</label>
                                </div>
                                <div>
                                    <label><b>description:</b> {this.state.description}</label>
                                </div>
                                
                                <div>
                                    <label><b>faculties:</b>
                                        <ul>
                                        {this.state.faculties.map((faculty, index) =>
                                        <li key={index}>{faculty}</li>
                                        )}
                                        </ul>
                                    </label>
                                </div>
                                <div>
                                    <label><b>start:</b> {this.state.start}</label>
                                </div>
                                <div>
                                    <label><b>status:</b> {this.state.status}</label>
                                </div>
                                {this.state.userRole != 'Student'?
                                    <div>
                                        <label><b>candidates:</b>
                                            <ul>
                                            {this.state.candidates.map((candidate, index) =>
                                                <li key={index}>{candidate.name}</li>
                                            )}
                                            </ul>
                                        </label>
                                    </div>
                                :null
                                }
                                

                                <button onClick={this.handleBack}>Back</button>
                            </td>
                        </tr>
                    :(this.state.showEdit && this.state.userRole == 'Tvrtka')?
                    <tr>
                        <th scope="row">{this.props.index+1}</th>
                        {/* <td><input 
                            name='name'
                            type='text'
                            value={this.state.name}
                            onChange={this.handleChange}/></td>
                        <td><input 
                            name='description'
                            type='text'
                            value={this.state.description}
                            onChange={this.handleChange}/></td>
                        
                        <td>
                            {this.state.facultyList.map((faculty, i) =>
                                <div className="form-check" key={i}>
                                    <input 
                                        type="checkbox" 
                                        name={faculty.name} 
                                        className="form-check-input"
                                        checked={this.checkFaculty(faculty.name)}
                                        onChange={this.onClickChange}
                                        value={this.state.faculties[i]}
                                        />
                                    <label className="form-check-label">{faculty.name}</label>
                                </div>
                            )}
                        </td>
                        <td><input 
                            name='start'
                            type='text'
                            value={this.state.start}
                            onChange={this.handleChange}/></td>
                        <td><input 
                            name='status'
                            type='text'
                            value={this.state.status}
                            onChange={this.handleChange}/></td>
                        <td><input 
                            name='candidates'
                            type='text'
                            value={this.state.candidates}
                            onChange={this.handleChange}/></td> */}
                        <td>
                            <div>
                                <label>name: </label>
                                <input 
                                    name='name'
                                    type='text'
                                    value={this.state.name}
                                    onChange={this.handleChange}/>
                            </div>
                            <div>
                                <label>description: </label>    
                                <input 
                                    name='description'
                                    type='text'
                                    value={this.state.description}
                                    onChange={this.handleChange}/>
                            </div>
                            <div>
                            <label>faculties: </label>
                            {this.state.List.map((faculty, i) =>
                                <div className="form-check" key={i}>
                                    <input 
                                        type="checkbox" 
                                        name={faculty.name} 
                                        className="form-check-input"
                                        checked={this.checkFaculty(faculty.name)}
                                        onChange={this.onClickChange}
                                        value={this.state.faculty[i]}
                                        />
                                    <label className="form-check-label">{faculty.name}</label>
                                </div>
                            )}
                            </div>
                            <div>
                                <label>start: </label>  
                                <input 
                                    name='start'
                                    type='text'
                                    value={this.state.start}
                                    onChange={this.handleChange}/> 
                            </div>
                            <div>
                                <label>status: </label>
                            {/* <input 
                                name='status'
                                type='text'
                                value={this.state.status}
                                onChange={this.handleChange}/>   */}
                                <input 
                                    type="radio" 
                                    name="status" 
                                    value="free" 
                                    checked={this.state.status === 'free'}
                                    onChange={this.handleChange}/>free
                                <input 
                                    type="radio" 
                                    name="status" 
                                    value="taken" 
                                    checked={this.state.status === 'taken'}
                                    onChange={this.handleChange}/>taken
                                <input 
                                    type="radio" 
                                    name="status" 
                                    value="finished" 
                                    checked={this.state.status === 'finished'}
                                    onChange={this.handleChange}/>finished
                            </div>
                            <div>
                                <label>candidates: </label>
                                {/* {console.log(this.state.candidates)} 
                                <li>{this.state.candidates}</li>*/}
                                    {this.state.candidates.map((candidate, index) =>
                                        // (candidate == {})? null
                                        // :
                                        // <li key={index}>{candidate.name}
                                        //     {!this.state.showProfile?
                                        //     <button onClick={this.showProfile.bind(this, candidate.id)}>Show profile</button>
                                        //     :<div>
                                        //         <ProfileList profile={this.state.profile}/>
                                        //         <button onClick={this.hideProfile}>Hide profile</button>
                                        //     </div>
                                        //     }
                                        // </li>
                                        //console.log(candidate)
                                        <Candidate key={index} candidate={candidate} id={this.state.id} handleBack={this.handleBack} 
                                        status={this.state.status} changeStatus={this.changeStatus}/>
                                    )}
                            </div>  
                            <button onClick={this.handleUpdate}>save</button>
                            <div>{this.state.errorMessage}</div>      
                        </td>

                        {/* <td><button onClick={this.handleUpdate}>Spremi</button></td>
                        <td><div>{this.state.errorMessage}</div></td> */}
                    </tr>
                    :null
                :null
            );
            
        //}
    }
}
export default PractiseList;