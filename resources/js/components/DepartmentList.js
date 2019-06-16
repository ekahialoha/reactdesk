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
                <h2>Select Department</h2>
                <ul>
                    {this.state.departments.map(department => {
                        return (
                            <li key={department.id}>
                                <Link to={{
                                        pathname: `/ticket/new/${department.id}`
                                    }}>{department.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default DepartmentList;
