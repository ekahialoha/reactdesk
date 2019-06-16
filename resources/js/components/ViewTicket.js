import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CreateTicket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ticket: {}
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
                <h4>{this.state.ticket.name} {this.state.ticket.email}</h4>
                <p>{this.state.ticket.message}</p>
            </div>
        );
    }
}

export default CreateTicket;
