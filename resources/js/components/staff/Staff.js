import React, { Component } from 'react';
import { ListGroup, Collapse, Card } from 'react-bootstrap';

class Staff extends Component {
    constructor(props) {
        super(props);

        this.state = {
            staff: [],
            editFormShow: null,
        };
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
            departmentId = null;
        }
        this.setState({
            editFormShow: userId,
        });
    }

    handleNewFormShow = () => {
        this.setState((prevState) => {
            prevState.newFormShow = !prevState.newFormShow;

            return {
                showForm: prevState.newFormShow
            };
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
                                    Edit From
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
                            Create new users here
                        </Card.Body>
                    </Collapse>
                </Card>
            </React.Fragment>
        );
    }
}

export default Staff;
