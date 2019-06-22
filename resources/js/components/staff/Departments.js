import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';

class Departments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            departments: []
        };
    }

    fetchDepartments = () => {
        axios.get('/api/departments')
        .then((res) => {
            console.log(res);
            this.setState({
                departments: res.data
            });
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
                <ListGroup>
                    {this.state.departments.map((department) => {
                        return (
                            <ListGroup.Item key={department.id}>
                                {department.name}
                                <span>
                                    <i className="fas fa-edit"></i>
                                    <i className="fas fa-trash-alt"></i>
                                </span>
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            </React.Fragment>
        );
    }
}

export default Departments;
