import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer className="footer fixed-bottom">
            Copyright 2019 ReactDesk / <a href="https://www.chriskelsom.com" target="_blank">Christian Kelsom-Martin</a>
                <div>
                    <a href="https://www.linkedin.com/in/ckelsom-martin/" target="_blank"><i className="fab fa-linkedin"></i></a>
                    <a href="https://github.com/ekahialoha" target="_blank"><i className="fab fa-github-square"></i></a>
                </div>
            </footer>
        );
    }
}

export default Footer;
