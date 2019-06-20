import React, { Component } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

class NewReply extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            showForm: false,
        };
    }

    handleChanges = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        console.log(this.state.message);

        this.setState({
            name: '',
            showForm: false
        });
    }

    render() {
        return (
            <React.Fragment>
                <Card>
                    <Card.Header>Reply</Card.Header>
                    <Card.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Control
                                required
                                as="textarea"
                                value={this.state.message}
                                placeholder="Enter your response here"
                                id="message"
                                onChange={this.handleChanges}
                            />
                            <Button type="submit">Reply</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </React.Fragment>
        );
    }
}

export default NewReply;
