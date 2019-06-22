import React, { Component } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';

class DepartmentsForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            status: 1,
        };

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleSubmit(this.state.name, this.state.description, this.state.status);
        this.setState({

        });
    }

    handleChanges = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group as={Row}>
                    <Form.Label column sm="3" htmlFor="subject">Name</Form.Label>
                    <Col sm="9">
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
                    <Form.Label column sm="3" htmlFor="message">Description</Form.Label>
                    <Col sm="9">
                    <Form.Control
                        required
                        as="textarea"
                        value={this.state.description}
                        placeholder="Description"
                        id="description"
                        onChange={this.handleChanges}
                    />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm="3" htmlFor="status">Status</Form.Label>
                    <Col sm="9">
                        <Form.Control
                            required
                            as="select"
                            value={this.state.status}
                            id="status"
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
                    ref={this.props.focus}
                >Create</Button>
            </Form>
        );
    }
}

export default DepartmentsForm;
