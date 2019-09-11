import React, { Component } from 'react';
import MainNavigation from './MainNavigation';
import PractiseList from './PractiseList';
import { Table, ListGroup, ListGroupItem, ListGroupItemHeading } from 'reactstrap';

class Archives extends Component {
    constructor(props){
        super(props);

        this.state = {
            userRole: localStorage.getItem('role'),
            practises: [],
            practise: [],
            user: [],

        };
        this.reloadPage = this.reloadPage.bind(this);
    
    }
    componentDidMount(){
        this.reloadPage();
    }
    reloadPage(){
        axios.get('/api/practise')
            .then(response =>{
                this.setState({
                    practises: response.data[0],
                    user: response.data[1]
                })
                let prakse = [];
                prakse = this.state.practises.filter(function(practice) {
                    return practice.status =='locked';
                });
                this.setState({
                    practise: prakse
                })
            }).catch(error =>{
                console.log(error);
            })
    }
    render() {
        return (
            <div className="container">
               {(this.state.userRole != null)?
                    <MainNavigation role={this.state.userRole}/>
                    :null
                }
                {(this.state.practise[0] !=undefined)?
                <Table bordered>
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
                        {this.state.practise.map((key, index) =>
                            
                            <PractiseList key={key.id} practice={key} index={index} changeState={this.reloadPage} user={this.state.user}/>
                            
                        )}
                    </tbody>
                </Table>
                :<div className="offset-md-3 col-md-6 offset-md-3">
                    <ListGroup>
                        <ListGroupItem>
                            <ListGroupItemHeading>Nema dostupnih izvještaja</ListGroupItemHeading>
                        </ListGroupItem>
                    </ListGroup>
                </div>
                }
           </div>
        );
    }
}
export default Archives;