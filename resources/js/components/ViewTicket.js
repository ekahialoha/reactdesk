import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const moment = require('moment');

class CreateTicket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ticket: {
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
        return (
            <div>
                <h2>ViewTicket</h2>
                <h3>{this.state.ticket.subject} - {this.state.ticket.track_id}</h3>
                <section>
                    <h4>{this.state.ticket.name} {this.state.ticket.email}</h4>
                    <small>{moment(this.state.ticket.created_at).calendar()}</small>
                    <p>{this.state.ticket.message}</p>
                </section>
                {this.state.ticket.replies.map((reply) => {
                    reply.created_at = moment(reply.created_at).calendar();
                    return (
                        <section key={reply.id}>
                            {reply.user ?
                                <h4>{reply.user.name}<small> - Staff {reply.created_at}</small></h4> :
                                <h4>{reply.name} <small>{reply.created_at}</small></h4>
                            }
                            <p>{reply.message}</p>
                        </section>
                    );
                })}
            </div>
        );
    }
}

export default CreateTicket;
