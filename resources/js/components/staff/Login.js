import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Alert, Container, Form, Row, Button } from 'react-bootstrap';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            redirect: false,
        };
    }

    validateAuth = () => {
        axios.post('/api/auth', {
            email: this.state.email,
            password: this.state.password
        })
        .then(res => {
            this.props.handleIAm(res.data);
        }).catch(err => {
            console.log('DepartmentList.fetchDepartments', err);
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.validateAuth();
    }

    handleChanges = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/staff/dashboard" />;
        }
        return (
            <React.Fragment>
            <Container className="text-align-center">
            <Form onSubmit={this.handleSubmit} className="form-signin">
                <div className="staff-logo-block">
                    <Link to="/">
                        <i className="fas fa-life-ring"></i>
                        <h1>ReactDesk</h1>
                    </Link>
                </div>
                <Alert variant="warning">Restricted Personnel Only</Alert>
                <Form.Group>
                    <Form.Label htmlFor="inputEmail">Email address</Form.Label>
                    <Form.Control
                        type="email"
                        id="email"
                        value={this.state.email}
                        onChange={this.handleChanges}
                        placeholder="Email address"
                        required
                        autoFocus
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="inputPassword">Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="password"
                        value={this.state.password}
                        onChange={this.handleChanges}
                        placeholder="Password"
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Button variant="primary" size="lg" type="submit" block>Sign in</Button>
                </Form.Group>
            </Form>
            </Container>
            </React.Fragment>
        );
    }
}

export default Login;
