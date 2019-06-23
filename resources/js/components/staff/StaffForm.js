import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

class StaffForm extends Component {
    constructor(props) {
        super(props);

        this.index = 'index' in this.props ? this.props.index : null;

        this.state = {
            name: 'user' in this.props ? this.props.user.name : '',
            email: 'user' in this.props ? this.props.user.description : '',
            password: '',
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if ('user' in this.props) {
            this.props.handleSubmit(this.state.name, this.state.email, this.state.password, this.props.index, this.props.user.id);
        } else {
            this.props.handleSubmit(this.state.name, this.state.email, this.state.password);
        }

        this.setState({
            name: '',
            email: '',
            password: '',
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
                    <Form.Label column sm="3" htmlFor="message">Email</Form.Label>
                    <Col sm="9">
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
                    <Form.Label column sm="3" htmlFor="status">Password</Form.Label>
                    <Col sm="9">
                        <Form.Control
                            required
                            type="password"
                            value={this.state.password}
                            placeholder="Password"
                            id="password"
                            onChange={this.handleChanges}
                        />
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

export default StaffForm;
