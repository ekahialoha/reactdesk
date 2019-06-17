import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './Header';

class ManageTicket extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Header tab="manageticket" />
                <Container>
                    Manage Ticket
                </Container>
            </React.Fragment>
        );
    }
}

export default ManageTicket;
