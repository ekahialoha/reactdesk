import React, { Component } from 'react';

class Departments extends Component {
    constructor(props) {
        super(props);
    }

    fetchDepartments = () => {
        axios.get('/api/departments')
        .then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log('Staff/Departments.fetchDepartments', err);
        })
    }

    componentDidMount = () => {
        this.fetchDepartments();
    }

    render() {
        return (
            <React.Fragment>
                <h1>Departments</h1>
            </React.Fragment>
        );
    }
}

export default Departments;
