import React, { Component } from 'react';
import { ListGroup, Collapse, Card, Form, Button, Row, Col } from 'react-bootstrap';

class Departments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            departments: [],
            newFormShow: false,
            newName: '',
            newStatus: 1,
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

    handleNewFormShow = () => {
        this.setState((prevState) => {
            prevState.newFormShow = !prevState.newFormShow;

            return {
                showForm: prevState.newFormShow
            };
        });
    }

    handleNewSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.newName, this.state.newStatus);
    }

    handleChanges = (e) => {
        this.setState({
            [e.target.id]: e.target.value
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
                <Card>
                    <Card.Header onClick={this.handleNewFormShow}>
                        Add New Department
                        {this.state.showForm ?
                            <i className="fas fa-caret-square-up"></i>
                            :
                            <i className="fas fa-caret-square-down"></i>
                        }
                    </Card.Header>
                    <Collapse in={this.state.newFormShow}>
                        <Card.Body>
                            <Form onSubmit={this.handleNewSubmit}>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2" htmlFor="subject">Name</Form.Label>
                                    <Col sm="10">
                                    <Form.Control
                                        required
                                        type="text"
                                        value={this.state.newName}
                                        placeholder="Name"
                                        id="newName"
                                        onChange={this.handleChanges}
                                    />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2" htmlFor="status">Status</Form.Label>
                                    <Col sm="10">
                                        <Form.Control
                                            required
                                            as="select"
                                            value={this.state.newStatus}
                                            id="newStatus"
                                            onChange={this.handleChanges}
                                        >
                                            <option value="1">Visible</option>
                                            <option value="2">Private</option>
                                        </Form.Control>
                                    </Col>
                                </Form.Group>

                                <Button
                                    type="submit"
                                    block
                                    size="lg"
                                    ref={this.replyFocus}
                                >Reply</Button>
                            </Form>
                        </Card.Body>
                    </Collapse>
                </Card>
            </React.Fragment>
        );
    }
}

export default Departments;
