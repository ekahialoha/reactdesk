import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DepartmentList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'departments': []
        };
    }

    fetchDepartments = () => {
        axios.get('/api/departments')
        .then(res => {
            this.setState({
                'departments': res.data
            }, () => {
                console.log(this.state.departments);
            });
        }).catch(err => {
            console.log('DepartmentList.fetchDepartments', err);
        });
    }

    componentDidMount = () => {
        this.fetchDepartments();
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default DepartmentList;
