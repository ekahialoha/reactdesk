import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';

import Footer from '../default/Footer';

class Dashboard extends Component {
    constructor(props) {
        super(props);
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
                                <Link to="/staff/tickets/open">
                                    <i className="fas fa-envelope-open-text"></i>
                                    <span>Open Tickets</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/staff/tickets/closed">
                                    <i className="fas fa-envelope"></i>
                                    <span>Closed tickets</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/staff/tickets/all">
                                    <i className="fas fa-inbox"></i>
                                    <span>All Tickets</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/staff/departments">
                                    <i className="fas fa-warehouse"></i>
                                    <span>Departments</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/staff/manage-staff">
                                    <i className="fas fa-users"></i>
                                    <span>Staff</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <main>
                        <Switch>
                            <Route path="/staff/tickets/closed" render={() => <h1>Closed</h1>} />
                            <Route path="/staff/tickets/all" render={() => <h1>All</h1>} />
                            <Route path="/staff/departments" render={() => <h1>Departments</h1>} />
                            <Route path="/staff/manage-staff" render={() => <h1>Staff</h1>} />
                            <Route /*path="/staff/tickets/open"*/ render={() => <h1>Open</h1>} />
                        </Switch>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius sapien nulla, at consequat massa tempor id. Nulla feugiat, ipsum vel fermentum tincidunt, purus diam posuere enim, at lobortis diam libero ut ex. Maecenas eu erat in dui pharetra mattis. Quisque dolor purus, bibendum vel elementum quis, ullamcorper sit amet nisl. Suspendisse eget dapibus lectus. In aliquam velit et orci pretium, sed posuere ex sodales. Sed dictum quam vitae neque tempor mattis. Suspendisse sit amet luctus purus.</p>

                        <p>Nullam ac nulla nisl. Sed odio velit, sodales vitae sem et, pellentesque aliquam quam. In bibendum id nunc in semper. Donec placerat magna in porta dapibus. Duis imperdiet diam eu nulla maximus, in iaculis arcu porta. Morbi faucibus tincidunt elit, consectetur molestie sapien sodales sed. Vestibulum a ex aliquet, vulputate libero vel, commodo diam. Fusce in sodales tellus. Etiam vitae blandit ex. Suspendisse libero ex, lobortis ut suscipit sit amet, finibus a arcu. Donec id nisi varius, suscipit sapien nec, congue lorem. Pellentesque faucibus suscipit leo. Aenean sed neque eu neque ornare bibendum. Cras urna ipsum, consequat ac tortor eget, iaculis volutpat tortor.</p>

                        <p>Aenean congue, felis in lacinia dapibus, velit nibh vulputate justo, quis imperdiet lacus dui mattis ex. Vivamus nisi ex, placerat nec erat nec, suscipit lobortis neque. Donec sodales bibendum posuere. Proin eu consequat elit. Mauris pharetra ullamcorper lectus, et laoreet elit. In aliquet in mi ac sodales. Praesent maximus purus ex, faucibus ultrices dui eleifend hendrerit. Duis volutpat mauris in felis fermentum efficitur. Nam fermentum auctor nisi, vel pulvinar quam mollis quis. Donec non eros quis libero hendrerit pharetra vel eu turpis. Sed vel erat a lacus ultricies dictum sit amet eget ligula. Aliquam metus est, sodales vulputate nisi suscipit, eleifend tempor lacus. Etiam rhoncus, dolor ut venenatis dapibus, libero justo consequat lorem, at auctor tellus augue eget risus. Maecenas dignissim felis et ornare ullamcorper.</p>

                        <p>Praesent euismod a velit et tincidunt. Maecenas est augue, dapibus ullamcorper facilisis convallis, vehicula quis diam. Phasellus et nibh vitae risus auctor rhoncus at nec nibh. Donec accumsan ipsum vitae odio volutpat malesuada. Sed in nisi non sem sollicitudin suscipit non at sapien. Vivamus massa risus, posuere id feugiat eu, blandit et leo. Aliquam nec sem viverra, feugiat lorem quis, suscipit lectus. In ac suscipit eros. Donec bibendum, metus non ultricies egestas, tortor ligula finibus ipsum, in hendrerit mi orci id neque. Donec at eros ac purus mollis maximus. Aliquam erat volutpat.</p>

                        <p>Nunc consectetur consequat hendrerit. Fusce fringilla diam massa. In euismod sollicitudin tellus, ac lobortis ex mollis vitae. Nam orci augue, posuere in leo quis, pharetra maximus mi. Duis accumsan tortor sit amet turpis feugiat sodales. Aenean id malesuada nulla. Donec lectus est, consectetur eget tempor eu, porttitor aliquam lectus. Nam faucibus felis sed erat feugiat commodo. Mauris laoreet orci sit amet sodales lobortis. Duis posuere semper placerat. Aliquam vitae posuere lorem, eu rutrum mi. Suspendisse potenti. In est nulla, ullamcorper quis leo at, pulvinar gravida ante. Maecenas finibus ullamcorper porttitor. Aliquam in velit lacinia, finibus ante ac, dictum nisl.</p>
                    </main>
                </Container>
                <Footer />
            </React.Fragment>
        );
    }
}

export default Dashboard;
