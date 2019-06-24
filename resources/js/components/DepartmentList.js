import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, ListGroup } from 'react-bootstrap';

import Header from './default/Header';
import Footer from './default/Footer';

class DepartmentList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            departments: []
        };
    }

    fetchDepartments = () => {
        axios.get('/api/departments')
        .then(res => {
            this.setState({
                departments: res.data
            }, () => {
                console.log(this.state.departments);
            });
        }).catch(err => {
            console.log('DepartmentList.fetchDepartments', err);
        });
    }

    componentDidMount = () => {
        this.fetchDepartments();
    }

    render() {
        return (
            <React.Fragment>
            <Header tab="newticket" />
            <Container>
                <h2>Select Department</h2>
                <ListGroup>
                    {this.state.departments.map(department => {
                        const link = `/ticket/new/${department.id}`;
                        return (
                            <Link key={department.id} to={{
                                pathname: `/ticket/new/${department.id}`
                            }}>
                                <ListGroup.Item action as="div">{department.name}</ListGroup.Item>
                            </Link>
                        );
                    })}
                </ListGroup>
            </Container>
            <Footer />
            </React.Fragment>
        );
    }
}

export default DepartmentList;
