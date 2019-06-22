import React, { Component } from 'react';

class TicketList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
            <h1>{this.props.header}</h1>
            <div>
                <div className="ticket-row ticket-row-heading">
                    <span className="ticket-check"></span>
                    <span className="ticket-id">Ticket ID</span>
                    <span className="ticket-subject">Subject</span>
                    <span className="ticket-name">Customer</span>
                    <span className="ticket-status">Status</span>
                </div>
                {this.props.tickets.map((ticket, index) => {
                    return (
                        <div
                            className="ticket-row"
                            key={index}
                            id={ticket.id}
                            onClick={() => {
                                this.props.history.push(`/staff/tickets/${ticket.id}`);
                            }}
                        >
                            <span className="ticket-check"><i className="far fa-envelope"></i></span>
                            <span className="ticket-id">{ticket.track_id}</span>
                            <span className="ticket-subject">{ticket.subject}</span>
                            <span className="ticket-name">{ticket.name}</span>
                            <span className="ticket-status">{ticketStatus[ticket.status]}</span>
                        </div>
                    );
                })}
            </div>
            </React.Fragment>
        );
    }
}

export default TicketList;
