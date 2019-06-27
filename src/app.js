import React, { Fragment } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faUndo } from "@fortawesome/free-solid-svg-icons";

import axios from "./axios";
import { DocumentViewr } from "./document-viewer";
import { WebcamCapture } from "./webcam";
import { Home } from "./home";
import { Scanner } from "./scanner";
import { DocumentViewer } from "./document-viewer";

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scannerVisible: false,
            searchVisible: false
        };
        this.hideScanner = this.hideScanner.bind(this);
        this.showScanner = this.showScanner.bind(this);
        this.showSearch = this.showSearch.bind(this);
        this.hideSearchBar = this.hideSearchBar.bind(this);

        // this.uploadImage = this.uploadImage.bind(this);
    }

    showScanner() {
        this.setState({
            scannerVisible: true
        });
        this.state.scannerVisible;
    }
    hideScanner() {
        this.setState({
            scannerVisible: false
        });
    }
    showSearch() {
        this.setState({
            searchVisible: true
        });
        this.state.scannerVisible;
    }
    hideSearchBar() {
        this.setState({
            searchVisible: false
        });
        console.log("scanner visible", this.state.scannerVisible);
    }

    // uploadImage(file) {
    //     const formData = new FormData();
    //     formData.append("file", file);
    // }
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
                <div className="wrapper">
                    <header>
                        <div className="nav-btn" />
                        <div className="nav-btn icon" onClick={this.showSearch}>
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                        <div>
                            <Link to="/home" className="nav-btn">
                                Home
                            </Link>
                        </div>
                        <div className="nav-btn">
                            <a href="/logout" className="nav-btn">
                                <FontAwesomeIcon icon={faSignOutAlt} />
                            </a>
                        </div>
                    </header>

                    <div className="mid-section">
                        <Route path="/camera" component={Scanner} />

                        <Route
                            path={"/home"}
                            render={() => (
                                <Home
                                    searchVisible={this.state.searchVisible}
                                    hideSearchBar={this.hideSearchBar}
                                />
                            )}
                        />
                        <Route path={"/test"} render={() => <Test />} />
                        <Route
                            path="/doc/:id"
                            render={props => (
                                <DocumentViewer
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
