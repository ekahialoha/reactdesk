import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';

import Login from './Login';
import Dashboard from './Dashboard';

class StaffRouter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {}
        };
    }

    handleIAm = () => {
        axios.post('/api/auth/iam')
        .then(res => {
            console.log(res);
            this.setState({
                redirect: true
            })
        }).catch(err => {
            console.log(err);
        });
    }

    componentDidMount = () => {
        this.handleIAm();
    }

    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Redirect exact from="/staff" to="/staff/auth" />
                    <Route exact path="/staff/auth" component={Login} />
                    <Route path="/staff/dashboard" component={Dashboard} />
                </Switch>
            </React.Fragment>
        );
    }
}

export default StaffRouter;
