import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Badge, ListGroup, DropdownButton, Dropdown } from 'react-bootstrap';

const moment = require('moment');

import Header from './default/Header';
import Footer from './default/Footer';
import Error from './default/Error';
import NewReply from './NewReply';

class CreateTicket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ticket: {
                department: {},
                replies: [],
                error: false,
            }
        };
        this.statuses = ticketStatus;
    }

    fetchTicket = () => {
        axios.get(`/api/tickets/${this.props.match.params.track_id}`)
        .then(res => {
            this.setState({
                'ticket': res.data
            });
        }).catch(err => {
            console.log('ViewTicket.fetchTicket', err)
            this.setState({
                error: true
            });
        });
    }

    handleReply = (message) => {
        axios.post('/api/replies', {
            ticket_id: this.state.ticket.track_id,
            user_id: null,
            name: this.state.ticket.name,
            message: message
        })
        .then(res => {
            this.setState(prevState => {
                prevState.ticket.replies.push(res.data);
                return {
                    ticket: prevState.ticket
                }
            });
        }).catch(err => {
            this.setState({
                error: true
            });
        });
    }

    handleUpdateStatus = (e) => {
        axios.put(`/api/tickets/${this.state.ticket.track_id}`, {
            name: this.state.ticket.name,
            email: this.state.ticket.email,
            department_id: this.state.ticket.department.id,
            subject: this.state.ticket.subject,
            message: this.state.ticket.message,
            priority: this.state.ticket.priority,
            status: parseInt(e.target.id),
        })
        .then(res => {
            this.setState(prevState => {
                return {
                    ticket: res.data,
                }
            });
        }).catch(err => {
            this.setState({
                error: true
            });
        });
    }

    componentDidMount = () => {
        this.fetchTicket();
    }

    render() {
        if (this.state.error) {
            return <Error headerTab="manageticket"/>;
        }

        const repliesCount = this.state.ticket.replies.length;

        return (
            <React.Fragment>
                <Header tab="manageticket" />
                <Container>
                <h2>View Ticket</h2>
                <Row>
                    <Col>
                        <dl className="row">
                            <dt className="col-sm-5">Tracking ID</dt>
                            <dd className="col-sm-7">{this.state.ticket.track_id}</dd>
                            <dt className="col-sm-5">Subject</dt>
                            <dd className="col-sm-7">{this.state.ticket.subject}</dd>
                            <dt className="col-sm-5">Email</dt>
                            <dd className="col-sm-7">{this.state.ticket.email}</dd>
                            <dt className="col-sm-5">Department</dt>
                            <dd className="col-sm-7">{this.state.ticket.department.name}</dd>
                            <dt className="col-sm-5">Status</dt>
                            <dd className="col-sm-7">
                                <DropdownButton
                                    title={`${ticketStatus[this.state.ticket.status]}`}
                                    variant='secondary'
                                    id="ticket-status"
                                >
                                    {ticketStatus.map((status, index) => {
                                        if (typeof status !== 'undefined') {
                                            return this.state.ticket.status === index ?
                                            <Dropdown.Item active eventKey={index} key={index} id={index} onClick={this.handleUpdateStatus}>{status}</Dropdown.Item> :
                                            <Dropdown.Item eventKey={index} key={index} id={index} onClick={this.handleUpdateStatus}>{status}</Dropdown.Item>;
                                        }
                                    })}
                                </DropdownButton>
                            </dd>
                        </dl>
                    </Col>
                    <Col>
                        <dl className="row">
                            <dt className="col-sm-5">Priority</dt>
                            <dd className="col-sm-7">{this.state.ticket.priority}</dd>
                            <dt className="col-sm-5">Opened On</dt>
                            <dd className="col-sm-7">{moment(this.state.ticket.created_at).format('MM/DDYYYY, h:mm:ss a')}</dd>
                            <dt className="col-sm-5">Opened By</dt>
                            <dd className="col-sm-7">{this.state.ticket.name}</dd>
                            {repliesCount > 0 ?
                                <React.Fragment>
                                    <dt className="col-sm-5">Last Reply By</dt>
                                    <dd className="col-sm-7">
                                        {this.state.ticket.replies[repliesCount - 1].user_id !== null ?
                                            this.state.ticket.replies[repliesCount - 1].user.name :
                                            this.state.ticket.replies[repliesCount - 1].name
                                        }
                                    </dd>
                                    <dt className="col-sm-5">Last Reply On</dt>
                                    <dd className="col-sm-7">{moment(this.state.ticket.created_at).format('MM/DDYYYY, h:mm:ss a')} </dd>
                                </React.Fragment> :
                                null
                            }
                        </dl>
                    </Col>
                </Row>
                <ListGroup>
                    <ListGroup.Item>
                        <div className="message-block">
                            <h4>{this.state.ticket.name}</h4>
                            <small>{moment(this.state.ticket.created_at).calendar()}</small>
                        </div>
                        <p>{this.state.ticket.message}</p>
                    </ListGroup.Item>

                {this.state.ticket.replies.map((reply) => {
                    const createdAt = moment(reply.created_at).calendar();
                    return (
                        <ListGroup.Item key={reply.id}>
                            <div className="message-block">
                                {reply.user ?
                                    <h4>
                                        {reply.user.name}
                                        <Badge variant="success">STAFF</Badge>
                                    </h4> :
                                    <h4>{reply.name}</h4>
                                }
                                <small>{createdAt}</small>
                            </div>
                            <p>{reply.message}</p>
                        </ListGroup.Item>
                    );
                })}
                </ListGroup>
                <NewReply handleReply={this.handleReply} />
                </Container>
                <Footer />
            </React.Fragment>
        );
    }
}

export default CreateTicket;
