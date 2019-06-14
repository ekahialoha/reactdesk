import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

console.log('LOADED');

export default class App extends Component {
    index = () => {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Example Component</div>

                            <div className="card-body">
                                I'm an example component!
                                <Link to="/test">Test</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    test = () => {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Test Component</div>

                            <div className="card-body">
                                I'm an test component!
                                <Link to="/">Home</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <Switch>
                <Route exact path="/" component={this.index} />
                <Route path="/test" component={this.test} />

            </Switch>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>,
        document.getElementById('example'));
}
