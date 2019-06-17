import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navTabs: [
                {
                    name: 'New Ticket',
                    id: 'newticket',
                    link: '/ticket/new',
                    default: true
                },
                {
                    name: 'Manage Ticket',
                    id: 'manageticket',
                    link: '/ticket/manage'
                }
            ],
            defaultTab: { id: null },
            useDefault: false
        };
    }

    getDefaultTab = () => {
        return this.state.navTabs.find((current) => {
            return typeof current.default !== 'undefined' ? current : undefined;
        });
    }

    checkUseDefaultTab = () => {
        const foundOrNot = this.state.navTabs.find((current) => {
            return current.id === this.props.tab;
        });
        return typeof foundOrNot !== 'undefined' ? false : true;
    }

    componentDidMount = () => {
        this.setState({
            defaultTab: this.getDefaultTab(),
            useDefault: this.checkUseDefaultTab()
        });
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.tab !== this.props.tab) {
            this.setState({
                defaultTab: this.getDefaultTab(),
                useDefault: this.checkUseDefaultTab()
            });
        }
    }



    render() {
        return (
            <header>
                <div className="logo-block">
                    <i className="fas fa-life-ring"></i>
                    <h1>ReactDesk</h1>
                </div>
                <nav className="nav-tabs">
                    <ul className="nav">
                        {this.state.navTabs.map((tab, index, navTabs) => {
                            let className = 'nav-link';

                            if (tab.id === this.props.tab ||
                                tab.id === this.state.defaultTab.id && this.state.useDefault) {
                                className += ' active';
                            }

                            return (
                                <li key={tab.id} className="nav-item">
                                    <Link to={tab.link} className={className}>{tab.name}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;
