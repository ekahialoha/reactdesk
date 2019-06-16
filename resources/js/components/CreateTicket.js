import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CreateTicket extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h2>Create Ticket - {this.state.department.name}</h2>
                <form>
                    <input required
                            type="text"
                            placeholder="Name"
                            id="name"
                    />
                    <input required
                            type="email"
                            placeholder="Email"
                            id="email"
                    />
                    <input required
                            type="text"
                            placeholder="Subject"
                            id="subject"
                    />
                    <textarea
                            required
                            placeholder="Message"
                            id="message"
                    ></textarea>
                    <select
                            required
                            id="priority"
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
