import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Badge } from 'react-bootstrap';

const moment = require('moment');

import Header from './default/Header';
import Footer from './default/Footer';

class CreateTicket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ticket: {
                department: {},
                replies: []
            }
        };
    }

    fetchTicket = () => {
        axios.get(`/api/tickets/${this.props.match.params.track_id}`)
        .then(res => {
            console.log(res);
            this.setState({
                'ticket': res.data
            }, () => {
                console.log(this.state.ticket);
            });
        }).catch(err => {
            console.log('ViewTicket.fetchTicket', err)
        });
    }

    componentDidMount = () => {
        this.fetchTicket();
    }

    render() {
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
                            <dd className="col-sm-7">{/*this.state.ticket.status*/}</dd>
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
                <section>
                    <h4>
                        {this.state.ticket.name}
                        <small>{moment(this.state.ticket.created_at).calendar()}</small>
                    </h4>
                    <p>{this.state.ticket.message}</p>
                </section>
                {this.state.ticket.replies.map((reply) => {
                    reply.created_at = moment(reply.created_at).calendar();
                    return (
                        <section key={reply.id}>
                            {reply.user ?
                                <h4>
                                    {reply.user.name}
                                    <Badge variant="success">STAFF</Badge>
                                    <small>{reply.created_at}</small>
                                </h4> :
                                <h4>{reply.name} <small>{reply.created_at}</small></h4>
                            }
                            <p>{reply.message}</p>
                        </section>
                    );
                })}
                </Container>
                <Footer />
            </React.Fragment>
        );
    }
}

export default CreateTicket;
