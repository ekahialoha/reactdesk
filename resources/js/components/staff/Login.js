import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Container, Form, Row, Button } from 'react-bootstrap';

class DepartmentList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    validateAuth = () => {
        axios.post('/api/auth', {
            email: this.state.email,
            password: this.state.password
        })
        .then(res => {
            console.log(res);
            this.setState({
                departments: res.data
            }, () => {
                console.log(this.state.departments);
            });
        }).catch(err => {
            console.log('DepartmentList.fetchDepartments', err);
        });
    }

    checkToken = () => {
        axios.post('/oauth/token', {
            'form_params': {
            'grant_type': 'authorization_code',
            'client_id': 'client-id',
            'client_secret': 'client-secret',
            'redirect_uri': 'http://example.com/callback',
            'code': '',
        }
        })
        .then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.validateAuth();
    }

    handleChanges = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    componentDidMount = () => {
        this.checkToken();
    }

    render() {
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

export default DepartmentList;
