import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';

import Header from './Header';
import Footer from './Footer';

class ManageTicket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            track_id: '',
            email: '',
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.track_id, this.state.email);
    }

    handleChanges = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    render() {
        return (
            <React.Fragment>
                <Header tab="manageticket" />
                <Container>
                    <h2>Manage Existing Ticket</h2>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2" htmlFor="name">Tracking ID</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Tracking ID"
                                    id="track_id"
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
                                    placeholder="Email"
                                    id="email"
                                    onChange={this.handleChanges}
                                />
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

export default ManageTicket;
