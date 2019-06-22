import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';

import Departments from './Departments';
import TicketList from './TicketList';
import Footer from '../default/Footer';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: 'tickets-open'
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
                this.props.history.push(this.navBarOpts[clickedNav].link);
            });
        }
    }

    fetchTickets = () => {
        axios.get('/api/tickets')
        .then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log('Staff/Dashboard.fetchTickets', err);
        })
    }

    componentDidMount = () => {
        this.fetchTickets();
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
                                    <span>Closed tickets</span>
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
                            <Route path="/staff/tickets/closed" render={(props) => <TicketList header="Closed" {...props} />} />
                            <Route path="/staff/tickets/all" render={(props) => <TicketList header="All" {...props} />} />
                            <Route path="/staff/tickets/:id" render={() => <h1>Ticket View</h1>} />
                            <Route path="/staff/manage-staff" render={() => <h1>Staff</h1>} />
                            <Route path="/staff/departments" component={Departments} />
                            <Route path="/staff/manage-staff" render={() => <h1>Staff</h1>} />
                            <Route /*path="/staff/tickets/open"*/ render={(props) => <TicketList header="Open" {...props} />} />
                        </Switch>
                    </main>
                </Container>
                <Footer unsticky />
            </React.Fragment>
        );
    }
}

export default Dashboard;
