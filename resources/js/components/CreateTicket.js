import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CreateTicket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            department: {},
            name: '',
            email: '',
            subject: '',
            message: '',
            priority: 0
        };
    }

    fetchDepartment = () => {
        axios.get(`/api/departments/${this.props.match.params.id}`)
        .then(res => {
            console.log(res);
            this.setState({
                'department': res.data
            }, () => {
                console.log(this.state.department);
            });
        }).catch(err => {
            console.log('CreateTicket.fetchDepartment', err)
        });
    }

    componentDidMount = () => {
        this.fetchDepartment();
        console.log(this.props.match.params.id);
    }

    handleChanges = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        axios.post('/api/tickets', {
            name: this.state.name,
            department_id: this.state.department.id,
            email: this.state.email,
            subject: this.state.subject,
            message: this.state.message,
            priority: this.state.priority
        }).then(res => {
            console.log('CreateTicket.handleSubmit SUCCESS');
            this.setState({
                name: '',
                email: '',
                subject: '',
                message: '',
                priority: 0
            });
        }).catch(err => {
            console.log('CreateTicket.handleSubmit', err);
        });
    }

    render() {
        return (
            <div>
                <h2>Create Ticket - {this.state.department.name}</h2>
                <form onSubmit={this.handleSubmit}>
                    <input required
                            type="text"
                            value={this.state.name}
                            placeholder="Name"
                            id="name"
                            onChange={this.handleChanges}
                    />
                    <input required
                            type="email"
                            value={this.state.email}
                            placeholder="Email"
                            id="email"
                            onChange={this.handleChanges}
                    />
                    <input required
                            type="text"
                            value={this.state.subject}
                            placeholder="Subject"
                            id="subject"
                            onChange={this.handleChanges}
                    />
                    <textarea
                            required
                            value={this.state.message}
                            placeholder="Message"
                            id="message"
                            onChange={this.handleChanges}
                    ></textarea>
                    <select
                            required
                            id="priority"
                            onChange={this.handleChanges}
                    >
                        <option value="1">Normal</option>
                        <option value="2">High</option>
                        <option value="3">Urgent</option>
                    </select>

                    <button>Create Ticket</button>
                </form>
            </div>
        );
    }
}

export default CreateTicket;
