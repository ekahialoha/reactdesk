import React, { Component } from 'react';

class TicketList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tickets: [],
        };

        console.log('status' in this.props ? this.props.status : null);
    }

    fetchTickets = () => {
        let fetchUrl = '/api/tickets';
        if ('status' in this.props) {
            fetchUrl += `?status=${this.props.status}`
        }
        console.log(fetchUrl);
        axios.get(fetchUrl)
        .then((res) => {
            console.log(res);
            this.setState({
                tickets: res.data
            });
        }).catch((err) => {
            console.log('Staff/TicketList.fetchTickets', err);
        })
    }

    componentDidMount = () => {
        this.fetchTickets();
    }

    render() {
        return (
            <React.Fragment>
            <h1>
                {this.props.header}
                <i
                    className="fas fa-sync"
                    onClick={this.fetchTickets}
                ></i>
            </h1>
            <div>
                <div className="ticket-row ticket-row-heading">
                    <span className="ticket-check"></span>
                    <span className="ticket-id">Ticket ID</span>
                    <span className="ticket-subject">Subject</span>
                    <span className="ticket-name">Customer</span>
                    <span className="ticket-department">Department</span>
                    <span className="ticket-status">Status</span>
                </div>
                {this.state.tickets.map((ticket, index) => {
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
                            <span className="ticket-department">{ticket.department.name}</span>
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
