import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';

import Login from './Login';

class StaffRouter extends Component {
    render() {
        return (
            <React.Fragment>
                <Redirect exact from="/" to ="/staff/auth" />
                <Route exact path="/staff/auth" component={Login} />
            </React.Fragment>
        );
    }
}

export default StaffRouter;
