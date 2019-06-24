import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange({ target }) {
        //    console.log("target name: ", target.name);
        //    console.log("target value: ", target.value);
        this.setState({
            [target.name]: target.value
        });
    }
    submit(e) {
        e.preventDefault();
        console.log("post register, first", this.first);
        axios
            .post("/register", {
                first: this.state.first,
                last: this.state.last,
                email: this.state.email,
                password: this.state.password
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/posts");
                } else {
                    this.setState({
                        error: data.error
                    });
                }
            });
    }
    render() {
        return (
            <div className="registration-container">
                <div className="registration-form">
                    <div>
                        <h1>Create a new account</h1>
                    </div>
                    <form
                        onSubmit={e => this.submit(e)}
                        className="registration-form"
                    >
                        <input
                            name="first"
                            type="text"
                            placeholder="first name"
                            required
                            onChange={e => this.handleChange(e)}
                        />
                        <input
                            name="last"
                            type="text"
                            placeholder="last name"
                            required
                            onChange={e => this.handleChange(e)}
                        />
                        <input
                            name="email"
                            type="email"
                            placeholder="email"
                            required
                            onChange={e => this.handleChange(e)}
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="password"
                            required
                            onChange={e => this.handleChange(e)}
                        />

                        <button
                            disabled={!this.state.first}
                            className="registration-form-btn"
                            type="submit"
                            onClick={e => this.submit(e)}
                        >
                            <h3>Sign Up</h3>
                        </button>

                        {this.state.error && (
                            <div className="error-message">
                                {this.state.error}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        );
    }
}
