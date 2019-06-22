import React, { Component } from 'react';
import { ListGroup, Collapse, Card, Form, Button, Row, Col } from 'react-bootstrap';

import DepartmentsForm from './DepartmentsForm';
import { handleScroll } from '../Helpers';

class Departments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            departments: [],
            newFormShow: false,
            editFormShow: null,
        };

        this.newFocus = React.createRef();
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

    handleNewFormShow = () => {
        this.setState((prevState) => {
            prevState.newFormShow = !prevState.newFormShow;

            return {
                showForm: prevState.newFormShow
            };
        }, () => {
            if (this.state.newFormShow) {
                handleScroll(this.newFocus)
    ;        }
        });
    }

    handleNewSubmit = (name, description, status) => {
        axios.post('/api/departments', {
            name: name,
            description: description,
            status: status,
        }).then((res) => {
            this.setState((prevState) => {
                prevState.departments.push(res.data);

                return {
                    newFormShow: false,
                };
            })
        }).catch((err) => {
            console.log('Staff/Departments.handleNewSubmit', err);
        });
    }

    handleEditFormShow = (e) => {
        let departmentId = parseInt(e.target.attributes.index.value);
        if (this.state.editFormShow === departmentId) {
            departmentId = null;
        }
        this.setState({
            editFormShow: departmentId,
        });
    }

    handleEditSubmit = (name, description, status, index, id) => {
        axios.put(`/api/departments/${id}`, {
            name: name,
            description: description,
            status: status,
        }).then((res) => {
            this.setState((prevState) => {
                prevState.departments[index] = res.data;

                return {
                    departments: prevState.departments,
                    editFormShow: null,
                };
            }, () => {
                console.log(this.state.departments);
            });
        }).catch((err) => {
            console.log('Staff/Departments.handleEditSubmit', err);
        });
    }

    componentDidMount = () => {
        this.fetchDepartments();
    }

    render() {
        return (
            <React.Fragment>
                <h1>Departments</h1>
                <ListGroup>
                    {this.state.departments.map((department, index) => {
                        return (
                            <ListGroup.Item key={department.id}>
                            {this.state.editFormShow === index ?
                                <React.Fragment>
                                    <DepartmentsForm
                                        index={index}
                                        handleSubmit={this.handleEditSubmit}
                                        handleClose={this.handleEditFormShow}
                                        focus={this.newFocus}
                                        department={department}
                                        button="Update"
                                    />
                                </React.Fragment> :
                                <React.Fragment>
                                 {department.name}
                                 <small className="description">{department.description}</small>
                                 <span>
                                     <i
                                         className="fas fa-edit"
                                         onClick={this.handleEditFormShow}
                                         index={index}
                                     ></i>
                                     <i className="fas fa-trash-alt"></i>
                                 </span>
                                 </React.Fragment>
                            }
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
                <Card>
                    <Card.Header onClick={this.handleNewFormShow}>
                        Add New Department
                        {this.state.newFormShow ?
                            <i className="fas fa-caret-square-up"></i>
                            :
                            <i className="fas fa-caret-square-down"></i>
                        }
                    </Card.Header>
                    <Collapse in={this.state.newFormShow}>
                        <Card.Body>
                            <DepartmentsForm
                                handleSubmit={this.handleNewSubmit}
                                focus={this.newFocus}
                                button="Create"
                            />
                        </Card.Body>
                    </Collapse>
                </Card>
            </React.Fragment>
        );
    }
}

export default Departments;
