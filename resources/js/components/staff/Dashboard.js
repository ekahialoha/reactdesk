import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Navbar
                    fixed="top"
                    variant="dark"
                    bg="dark"
                >
                    <Navbar.Brand>ReactDesk</Navbar.Brand>
                    <Navbar.Text>
                        Welcome,{this.props.user.name}!
                    </Navbar.Text>
                    <Nav>
                        <Nav.Item>
                            <Link to="/staff/terminate">Logout</Link>
                        </Nav.Item>
                    </Nav>
                </Navbar>
        </React.Fragment>
        );
    }
}

export default Dashboard;
