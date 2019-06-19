import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './Header';
import Footer from './Footer';

class Error extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Header tab={this.props.headerTab} />
                <Container>
                    We appolozie for the inconvience, but there's something about an error?
                </Container>
                <Footer />
            </React.Fragment>
        );
    }
}

export default Error;
