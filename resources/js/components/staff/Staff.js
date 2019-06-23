import React, { Component } from 'react';
import { ListGroup, Collapse, Card } from 'react-bootstrap';

import StaffForm from './StaffForm';
import { handleScroll } from '../Helpers';

class Staff extends Component {
    constructor(props) {
        super(props);

        this.state = {
            staff: [],
            editFormShow: null,
            newFormShow: false,
        };

        this.newFocus = React.createRef();
    }

    fetchUsers = () => {
        axios.get('/api/users')
        .then((res) => {
            this.setState({
                staff: res.data
            });
        }).catch((err) => {
            console.log('Staff/Staff.fetchUsers', err);
        })
    }

    handleEditFormShow = (e) => {
        let userId = parseInt(e.target.attributes.index.value);
        if (this.state.editFormShow === userId) {
            userId = null;
        }
        this.setState({
            editFormShow: userId,
        });
    }

    handleNewFormShow = () => {
        this.setState((prevState) => {
            prevState.newFormShow = !prevState.newFormShow;

            return {
                newFormShow: prevState.newFormShow,
            };
        }, () => {
            if (this.state.newFormShow) {
                handleScroll(this.newFocus);
            }
        });
    }

    handleEditSubmit = (name, email, password, index, id) => {
        axios.put(`/api/users/${id}`, {
            name: name,
            email: email,
            status: password,
        }).then((res) => {
            this.setState((prevState) => {
                prevState.staff[index] = res.data;

                return {
                    staff: prevState.staff,
                    editFormShow: null,
                };
            });
        }).catch((err) => {
            console.log('Staff/Staff.handleEditSubmit', err);
        });
    }


    handleNewSubmit = (name, email, password) => {
        axios.post('/api/users', {
            name: name,
            email: email,
            password: password
        }).then((res) => {
            this.setState((prevState) => {
                prevState.staff.push(res.data);

                return {
                    staff: prevState.staff,
                    newFormShow: false,
                };
            });
        }).catch((err) => {
            console.log('Staff/Staff.handleNewSubmit', err);
        });
    }

    componentDidMount = () => {
        this.fetchUsers();
    }

    render() {
        return (
            <React.Fragment>
                <h1>Manage Staff</h1>
                <ListGroup>
                    {this.state.staff.map((user, index) => {
                        return (
                            <ListGroup.Item key={user.id}>
                            {this.state.editFormShow === index ?
                                <React.Fragment>
                                    <StaffForm
                                        index={index}
                                        handleSubmit={this.handleEditSubmit}
                                        handleClose={this.handleEditFormShow}
                                        focus={this.newFocus}
                                        user={user}
                                        button="Update"
                                    />
                                </React.Fragment> :
                                <React.Fragment>
                                 {user.name}
                                 <small className="description">{user.email}</small>
                                 <span>
                                    <i
                                        className="fas fa-edit"
                                        onClick={this.handleEditFormShow}
                                        index={index}
                                    ></i>
                                    <i
                                        className="fas fa-trash-alt"
                                        onClick={this.handleDelete}
                                        id={user.id}
                                        index={index}
                                    ></i>
                                 </span>
                                 </React.Fragment>
                            }
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
                <Card>
                    <Card.Header onClick={this.handleNewFormShow}>
                        Add New Staff Memeber
                        {this.state.newFormShow ?
                            <i className="fas fa-caret-square-up"></i>
                            :
                            <i className="fas fa-caret-square-down"></i>
                        }
                    </Card.Header>
                    <Collapse in={this.state.newFormShow}>
                        <Card.Body>
                            <StaffForm
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

export default Staff;
