import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class StudentInfo extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <tr>
                <th scope="row">{this.props.index}</th>
                <td>{this.props.name}</td>
                <td>{this.props.lastName}</td>
                <td>{this.props.indxNumber}</td>
                <td>{this.props.faculty}</td>
                <td>{this.props.study}</td>
                <td>{this.props.yearsOfStudy}</td>
            </tr>
        );
    }
}
export default StudentInfo;