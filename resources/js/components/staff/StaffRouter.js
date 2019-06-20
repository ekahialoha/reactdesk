import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';

import Login from './Login';
import Dashboard from './Dashboard';

class StaffRouter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
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
            console.log('Staff/StaffRouter.handleCheckIAm: IAM WHO?', res.data);
        }).catch(err => {
            console.log('Staff/StaffRouter.handleCheckIAm:', err);
        });
    }

    handleTerminate = () => {
        axios.post('/api/auth/terminate')
        .then(res => {
            this.setState({
                user: {}
            }, () => {
                console.log(this.state.user);
                this.props.history.push('/staff');
            });
        }).catch(err => {
            console.log('Staff/StaffRouter.handleTerminate', err);
        });
        return '';
    }

    componentDidMount = () => {
        this.handleCheckIAm();
    }

    render() {
        if (typeof this.state.user.id !== 'undefined') {
            return (
                <React.Fragment>
                    <Switch>
                        <Redirect exact from="/staff/auth" to="/staff/dashboard" /> :
                        <Route
                            path="/staff/dashboard"
                            component={props => {
                                return <Dashboard {...props} user={this.state.user} />;
                            }}
                        />
                        <Route path="/staff/terminate" component={this.handleTerminate} />
                        <Route render={() => <Redirect to="/staff/dashboard" />} />
                    </Switch>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <Switch>
                        <Redirect exact from="/staff" to="/staff/auth" />
                        <Route
                             exact
                             path="/staff/auth"
                             component={props => {
                                 return <Login {...props} handleIAm={this.handleIAm} />
                             }}
                         />
                        <Route render={() => <Redirect to="/staff/auth" />} />
                    </Switch>
                </React.Fragment>
            );
        }
    }
}

export default StaffRouter;
