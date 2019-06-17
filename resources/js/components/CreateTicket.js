import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button, Col, Row, InputGroup } from 'react-bootstrap';

import Header from './default/Header';
import Footer from './default/Footer';

class CreateTicket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            department: {},
            name: '',
            email: '',
            subject: '',
            message: '',
            priority: 0
        };
    }

    fetchDepartment = () => {
        axios.get(`/api/departments/${this.props.match.params.id}`)
        .then(res => {
            console.log(res);
            this.setState({
                'department': res.data
            }, () => {
                console.log(this.state.department);
            });
        }).catch(err => {
            console.log('CreateTicket.fetchDepartment', err)
        });
    }

    componentDidMount = () => {
        this.fetchDepartment();
    }

    handleChanges = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        axios.post('/api/tickets', {
            name: this.state.name,
            department_id: this.state.department.id,
            email: this.state.email,
            subject: this.state.subject,
            message: this.state.message,
            priority: this.state.priority
        }).then(res => {
            console.log('CreateTicket.handleSubmit SUCCESS');
            this.setState({
                name: '',
                email: '',
                subject: '',
                message: '',
                priority: 0
            });
        }).catch(err => {
            console.log('CreateTicket.handleSubmit', err);
        });
    }

    render() {
        return (
            <React.Fragment>
                <Header tab="newticket" />
                <Container>
                    <h2>Create New Ticket</h2>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2" for="name">Name</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    required
                                    type="text"
                                    value={this.state.name}
                                    placeholder="Name"
                                    id="name"
                                    onChange={this.handleChanges}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2" for="email">Email</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    required
                                    type="email"
                                    value={this.state.email}
                                    placeholder="Email"
                                    id="email"
                                    onChange={this.handleChanges}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">Department</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    plaintext
                                    readOnly
                                    value={this.state.department.name}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2" for="subject">Subject</Form.Label>
                            <Col sm="10">
                            <Form.Control
                                required
                                type="text"
                                value={this.state.subject}
                                placeholder="Subject"
                                id="subject"
                                onChange={this.handleChanges}
                            />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2" for="message">Message</Form.Label>
                            <Col sm="10">
                            <Form.Control
                                required
                                as="textarea"
                                value={this.state.message}
                                placeholder="Message"
                                id="message"
                                onChange={this.handleChanges}
                            />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2" for="priority">Priority</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    required
                                    as="select"
                                    value={this.state.priority}
                                    id="priority"
                                    onChange={this.handleChanges}
                                >
                                    <option value="1">Normal</option>
                                    <option value="2">High</option>
                                    <option value="3">Urgent</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Container>
                <Footer />
            </React.Fragment>
        );
    }
}

export default CreateTicket;
