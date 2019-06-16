import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';

import DepartmentList from './DepartmentList';
import CreateTicket from './CreateTicket';
import ViewTicket from './ViewTicket';

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <h1>ReactDesk</h1>
                <Switch>
                    <Redirect exact from="/" to ="/ticket/new" />
                    <Route exact path="/ticket/new" component={DepartmentList} />
                    <Route path="/ticket/new/:id" component={CreateTicket} />
                    <Route path="/ticket/view/:track_id" component={ViewTicket} />
                </Switch>
            </React.Fragment>
        );
    }
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);
