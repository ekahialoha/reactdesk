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

    handleIAm = (user) => {
        this.setState({
            user: user
        });
    }

    handleCheckIAm = () => {
        axios.post('/api/auth/iam')
        .then(res => {
            this.handleIAm(res.data);
        }).catch(err => {
            console.log(err);
        });
    }

    componentDidMount = () => {
        this.handleCheckIAm();
    }

    render() {
        return (
            <React.Fragment>
                <Switch>
                    {/*<Redirect exact from="/staff" to="/staff/auth" />*/}
                    {typeof this.state.user.id !== 'undefined' ?
                        <Redirect exact from="/staff/auth" to="/staff/dashboard" /> :
                         <Route
                             exact
                             path="/staff/auth"
                             component={props => {
                                 return <Login {...props} handleIAm={this.handleIAm} />
                             }}
                         />
                    }
                    <Route path="/staff/dashboard" component={props => {
                        return <Dashboard {...props} user={this.state.user} />;
                    }} />
                </Switch>
            </React.Fragment>
        );
    }
}

export default StaffRouter;
