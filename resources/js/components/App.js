import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';

import DepartmentList from './DepartmentList.js';

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <div>ReactDesk</div>
                <Switch>
                    <Redirect exact from="/" to ="/ticket/new" />
                    <Route exact path="/ticket/new" component={DepartmentList} />
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
