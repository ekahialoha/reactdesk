import React, { Component } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';

class DepartmentsForm extends Component {
    constructor(props) {
        super(props);

        this.index = 'index' in this.props ? this.props.index : null;

        this.state = {
            name: 'department' in this.props ? this.props.department.name : '',
            description: 'department' in this.props ? this.props.department.description : '',
            status: 'department' in this.props ? this.props.department.status : 1,
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if ('department' in this.props) {
            this.props.handleSubmit(this.state.name, this.state.description, this.state.status, this.props.index, this.props.department.id);
        } else {
            this.props.handleSubmit(this.state.name, this.state.description, this.state.status);
        }

        this.setState({
            name: '',
            description: '',
            status: 1,
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
                    <Col sm={this.index === null ? "9" : "8"}>
                    <Form.Control
                        required
                        type="text"
                        value={this.state.name}
                        placeholder="Name"
                        id="name"
                        onChange={this.handleChanges}
                    />
                    </Col>
                    {this.index !== null ?
                        <Col>
                            <i
                                className="fas fa-window-close"
                                onClick={this.props.handleClose}
                                index={this.props.index}
                            ></i>
                        </Col> :
                        ''
                    }
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
                >{this.props.button}</Button>
            </Form>
        );
    }
}

export default DepartmentsForm;
