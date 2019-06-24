import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "./axios";
import { Scanner } from "./scanner";

import { Home } from "./home";

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderVisible: false,
            query: "last3"
        };
        this.uploaded = this.uploaded.bind(this);
        this.showUploader = this.showUploader.bind(this);
        this.hideUploader = this.hideUploader.bind(this);
    }

    uploaded(url) {
        this.setState({
            imageUrl: url,
            uploaderVisible: false
        });
    }

    showUploader() {
        this.setState({
            uploaderVisible: true
        });
    }
    hideUploader() {
        this.setState({
            uploaderVisible: false
        });
    }

    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            if (data.error) {
                location.replace("/welcome");
            } else {
                this.setState(data);
            }
        });
    }

    render() {
        const imageUrl = this.state.imageUrl || "/img/default.png";
        const coverImgUrl = this.state.coverImgUrl;
        const id = this.state.id;
        const first = this.state.first;
        const last = this.state.last;
        const bio = this.state.bio;
        const query = this.state.query;

        if (!id) {
            return <img src="/img/spinner.gif" />;
        }
        return (
            <BrowserRouter>
                <div className="app-container">
                    <header>
                        <Link to="/home" className="nav-btn">
                            Home
                        </Link>

                        <Link to="/profile" className="nav-btn img-icon">
                            find docs
                        </Link>
                        <a href="/logout" className="nav-btn">
                            <FontAwesomeIcon icon={faSignOutAlt} />
                        </a>
                    </header>
                    <div className="app-body">
                        <h2>app.js content</h2>
                        <button className="cam-btn" onClick={this.showUploader}>
                            Scanner
                        </button>
                        {this.state.uploaderVisible && (
                            <Scanner
                                uploaded={this.uploaded}
                                hideUploader={this.hideUploader}
                            />
                        )}
                        <Route path={"/home"} render={() => <Home />} />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
