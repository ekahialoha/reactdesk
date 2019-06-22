import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';

import Departments from './Departments';
import TicketList from './TicketList';
import ManageTicket from './ManageTicket';
import Footer from '../default/Footer';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: 'tickets-open',
        };

        this.navBarOpts = {
            'tickets-open': {
                ref: React.createRef(),
                link: '/staff/dashboard'
            },
            'tickets-closed': {
                ref: React.createRef(),
                link: '/staff/tickets/closed'
            },
            'tickets-hold': {
                ref: React.createRef(),
                link: '/staff/tickets/hold'
            },
            'tickets-all': {
                ref: React.createRef(),
                link: '/staff/tickets/all'
            },
            'departments': {
                ref: React.createRef(),
                link: '/staff/departments'
            },
            'staff': {
                ref: React.createRef(),
                link: '/staff/manage-staff'
            },
        };
    }

    handleActive = (clickedNav) => {
        if (this.state.active !== clickedNav) {
            this.setState((prevState) => {
                this.navBarOpts[prevState.active].ref.current.classList.remove('active');

                return {
                    active: clickedNav
                };
            }, () => {
                this.navBarOpts[clickedNav].ref.current.classList.add('active');
            });
        }
        this.props.history.push(this.navBarOpts[clickedNav].link);
    }

    manageTicket = (props) => {
        return <ManageTicket user={this.props.user} {...props} />;
    }

    ticketsClosed = (props) => {
        return <TicketList header="Closed" status="closed" {...props} />;
    }

    ticketsOpen = (props) => {
        return <TicketList header="Open" status="open" {...props} />;
    }

    ticketsAll = (props) => {
        return <TicketList header="All" {...props} />;
    }

    ticketsHold = (props) => {
        return <TicketList header="On Hold" status="hold" {...props} />;
    }

    render() {
        return (
            <React.Fragment>
                <Navbar
                    variant="dark"
                    bg="dark"
                >
                    <Navbar.Brand>ReactDesk</Navbar.Brand>
                    <Navbar.Text>
                        Welcome,{this.props.user.name}!
                    </Navbar.Text>
                    <Nav>
                        <Nav.Item>
                            <Link to="/staff/terminate">Logout</Link>
                        </Nav.Item>
                    </Nav>
                </Navbar>
                <Container className="staff-body">
                    <nav className="staff-nav">
                        <ul>
                            <li>
                                <div
                                    ref={this.navBarOpts['tickets-open'].ref}
                                    onClick={()=> this.handleActive('tickets-open')}
                                    className="active"
                                >
                                    <i className="fas fa-envelope-open-text"></i>
                                    <span>Open Tickets</span>
                                </div>
                            </li>
                            <li>
                                <div
                                    ref={this.navBarOpts['tickets-closed'].ref}
                                    onClick={() => this.handleActive('tickets-closed')}
                                >
                                    <i className="fas fa-envelope"></i>
                                    <span>Closed Tickets</span>
                                </div>
                            </li>
                            <li>
                                <div
                                    ref={this.navBarOpts['tickets-hold'].ref}
                                    onClick={() => this.handleActive('tickets-hold')}
                                >
                                    <i className="fas fa-mail-bulk"></i>
                                    <span>On Hold Tickets</span>
                                </div>
                            </li>
                            <li>
                                <div
                                    ref={this.navBarOpts['tickets-all'].ref}
                                    onClick={() => this.handleActive('tickets-all')}
                                >
                                    <i className="fas fa-inbox"></i>
                                    <span>All Tickets</span>
                                </div>
                            </li>
                            <li>
                                <div
                                    ref={this.navBarOpts['departments'].ref}
                                    onClick={() => this.handleActive('departments')}
                                >
                                    <i className="fas fa-warehouse"></i>
                                    <span>Departments</span>
                                </div>
                            </li>
                            <li>
                                <div
                                    ref={this.navBarOpts['staff'].ref}
                                    onClick={() => this.handleActive('staff')}
                                >
                                    <i className="fas fa-users"></i>
                                    <span>Staff</span>
                                </div>
                            </li>
                        </ul>
                    </nav>
                    <main>
                        <Switch>
                            <Route path="/staff/tickets/closed" component={this.ticketsClosed} />
                            <Route path="/staff/tickets/all" component={this.ticketsAll} />
                            <Route path="/staff/tickets/hold" component={this.ticketsHold} />
                            <Route path="/staff/tickets/:id" component={this.manageTicket} />
                            <Route path="/staff/manage-staff" render={() => <h1>Staff</h1>} />
                            <Route path="/staff/departments" component={Departments} />
                            <Route path="/staff/manage-staff" render={() => <h1>Staff</h1>} />
                            <Route /*path="/staff/tickets/open"*/ component={this.ticketsOpen} />
                        </Switch>
                    </main>
                </Container>
                <Footer unsticky />
            </React.Fragment>
        );
    }
}

export default Dashboard;
