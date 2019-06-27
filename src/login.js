import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ""
        };
    }
    handleChange({ target }) {
        // console.log("target name: ", target.name);
        // console.log("target value: ", target.value);
        this.setState({
            [target.name]: target.value
        });
    }
    submit(e) {
        e.preventDefault();
        console.log("post login,", this.email);
        console.log("post login,", this.password);

        axios
            .post("/login", {
                email: this.state.email,
                password: this.state.password
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/home");
                } else {
                    this.setState({
                        error: data.error
                    });
                }
            });
    }
    render() {
        return (
            <div className="login-container">
                <div className="reg-title">
                    <h4>Log In</h4>
                </div>
                <form onSubmit={e => this.submit(e)}>
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
                        disabled={!this.state.email}
                        className="form-btn"
                        type="submit"
                    >
                        Login
                    </button>
                    {this.state.error && (
                        <div className="error-message">{this.state.error}</div>
                    )}
                </form>
                <h5>
                    Not a member ? <Link to="/"> Register</Link>
                </h5>
            </div>
        );
    }
}
