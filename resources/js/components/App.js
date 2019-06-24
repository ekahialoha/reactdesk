import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';

import DepartmentList from './DepartmentList';
import CreateTicket from './CreateTicket';
import ViewTicket from './ViewTicket';
import ManageTicket from './default/ManageTicket';
import StaffRouter from './staff/StaffRouter';

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Redirect exact from="/" to ="/ticket/new" />
                    <Route exact path="/ticket/new" component={DepartmentList} />
                    <Route path="/ticket/new/:id" component={CreateTicket} />
                    <Route path="/ticket/view/:track_id" component={ViewTicket} />
                    <Route path="/ticket/manage" component={ManageTicket} />
                    <Route path="/staff" component={StaffRouter} />
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
