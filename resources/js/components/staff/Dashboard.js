import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Alert, Container, Form, Row, Button } from 'react-bootstrap';

class DepartmentList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                Welcome, {this.props.user.name}!
            </React.Fragment>
        );
    }
}

export default DepartmentList;
