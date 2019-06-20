import React, { Component } from 'react';
import { Form, Button, Card, Collapse } from 'react-bootstrap';

class NewReply extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            showForm: false,
        };

        this.replyFocus = React.createRef();
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

    handleScroll = () => {
        setTimeout(() => {
            this.replyFocus.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }, 305)
    }

    handleShowForm = () => {
        this.setState({
            showForm: !this.state.showForm
        }, () => {
            if (this.state.showForm) {
                this.handleScroll();
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <Card>
                    <Card.Header onClick={this.handleShowForm}>
                        Reply
                        {this.state.showForm ?
                            <i className="fas fa-caret-square-up"></i>
                            :
                            <i className="fas fa-caret-square-down"></i>
                        }
                    </Card.Header>
                    <Collapse in={this.state.showForm}>
                        <Card.Body>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group>
                                    <Form.Label htmlFor="message">Message</Form.Label>
                                    <Form.Control
                                        required
                                        as="textarea"
                                        value={this.state.message}
                                        placeholder="Enter your response here"
                                        id="message"
                                        onChange={this.handleChanges}
                                    />
                                </Form.Group>
                                <Button
                                    type="submit"
                                    block
                                    size="lg"
                                    ref={this.replyFocus}
                                >Reply</Button>
                            </Form>
                        </Card.Body>
                    </Collapse>
                </Card>
            </React.Fragment>
        );
    }
}

export default NewReply;
