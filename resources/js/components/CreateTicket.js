import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button, Col, Row, InputGroup } from 'react-bootstrap';

import Header from './default/Header';
import Footer from './default/Footer';
import Error from './default/Error';

class CreateTicket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            department: {},
            name: '',
            email: '',
            subject: '',
            message: '',
            priority: 0,
            error: false,
        };
    }

    fetchDepartment = () => {
        axios.get(`/api/departments/${this.props.match.params.id}`)
        .then(res => {
            console.log(res);
            this.setState({
                'department': res.data
            });
        }).catch(err => {
            console.log('CreateTicket.fetchDepartment', err);
            this.setState({
                error: true
            });
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
        if (this.state.error) {
            return <Error headerTab="newticket" />;
        }

        return (
            <React.Fragment>
                <Header tab="newticket" />
                <Container>
                    <h2>Create New Ticket</h2>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2" htmlFor="name">Name</Form.Label>
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
                            <Form.Label column sm="2" htmlFor="email">Email</Form.Label>
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
                                    defaultValue={this.state.department.name}
                                    tabIndex="-1"
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2" htmlFor="subject">Subject</Form.Label>
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
                            <Form.Label column sm="2" htmlFor="message">Message</Form.Label>
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
                            <Form.Label column sm="2" htmlFor="priority">Priority</Form.Label>
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
                        <Form.Group as={Row}>
                            <Col sm={{ span: 10, offset: 2 }}>
                                <Button variant="primary" type="submit">Submit</Button>
                                <Link className="btn btn-secondary btn-reset" to="/">Reset</Link>
                            </Col>
                        </Form.Group>
                    </Form>
                </Container>
                <Footer />
            </React.Fragment>
        );
    }
}

export default CreateTicket;
