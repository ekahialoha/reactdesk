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
                <div className="ticket-row">
                    <span className="ticket-check"><i className="far fa-envelope"></i></span>
                    <span className="ticket-id">7489-MJB-166</span>
                    <span className="ticket-subject">subject</span>
                    <span className="ticket-name">Customer</span>
                    <span className="ticket-status">Status</span>
                </div>
                <div className="ticket-row">
                    <span className="ticket-check"><i className="far fa-envelope"></i></span>
                    <span className="ticket-id">7489-MJB-166</span>
                    <span className="ticket-subject">subject</span>
                    <span className="ticket-name">Customer</span>
                    <span className="ticket-status">Status</span>
                </div>
                <div className="ticket-row">
                    <span className="ticket-check"><i className="far fa-envelope"></i></span>
                    <span className="ticket-id">7489-MJB-166</span>
                    <span className="ticket-subject">subject</span>
                    <span className="ticket-name">Customer</span>
                    <span className="ticket-status">Status</span>
                </div>
            </div>
            </React.Fragment>
        );
    }
}

export default TicketList;
