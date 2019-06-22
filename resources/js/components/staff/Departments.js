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
            newName: '',
            newDescription: '',
            newStatus: 1,
            editName: '',
            editDescription: '',
            editStatus: 1,
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
                    departments: prevState.departments,
                    newName: '',
                    newDescription: '',
                    newStatus: 1,
                    newFormShow: false,
                };
            })
        }).catch((err) => {
            console.log('Staff/Departments.handleNewSubmit', err);
        });
    }

    handleChanges = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleEditForm = (e) => {
        const departmentId = parseInt(e.target.attributes.index.value);
        this.setState({
            editName: this.state.departments[departmentId].name,
            editDescription: this.state.departments[departmentId].description,
            editStatus: this.state.departments[departmentId].status,
            editFormShow: departmentId,
        }, () => {
            console.log(this.state);
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
                        console.log(this.state.editFormShow);
                        return (
                            <ListGroup.Item key={department.id}>
                            {this.state.editFormShow === index ?
                                '' :
                                <React.Fragment>
                                 {department.name}
                                 <span>
                                     <i
                                         className="fas fa-edit"
                                         onClick={this.handleEditForm}
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
                            <DepartmentsForm handleSubmit={this.handleNewSubmit} focus={this.newFocus} />
                        </Card.Body>
                    </Collapse>
                </Card>
            </React.Fragment>
        );
    }
}

export default Departments;
