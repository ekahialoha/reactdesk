import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header>
                <div className="logo-block">
                    <i class="fas fa-life-ring"></i>
                    <h1>ReactDesk</h1>
                </div>
                <nav className="nav-tabs">
                    <ul class="nav">
                        <li className="nav-item">
                            <Link to="/test" className="nav-link active">New Ticket</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/test" className="nav-link">Manage Ticket</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;
