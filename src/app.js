import React, { Fragment } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import axios from "./axios";
import { DocumentViewr } from "./document-viewr";
import FindDocs from "./find-docs";
import { Documents } from "./documents";
import { WebcamCapture } from "./webcam";
import { Home } from "./home";
import { ProfileMenu } from "./profile-menu";
import { Scanner } from "./scanner";

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scannerVisible: false
        };
        this.hideScanner = this.hideScanner.bind(this);
        this.showScanner = this.showScanner.bind(this);
        // this.uploadImage = this.uploadImage.bind(this);
    }

    showScanner() {
        this.setState({
            scannerVisible: true
        });
        this.state.scannerVisible;
        console.log("scanner visible", this.state.scannerVisible);
    }
    hideScanner() {
        this.setState({
            scannerVisible: false
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
                <div className="app-container">
                    <header>
                        <div />
                        <div>
                            <Link to="/home" className="nav-btn">
                                <span>Home</span>
                            </Link>

                            <Link to="/profile" className="nav-btn img-icon">
                                find docs
                            </Link>
                            <a href="/logout" className="nav-btn">
                                <FontAwesomeIcon icon={faSignOutAlt} />
                            </a>
                            <ProfileMenu />
                        </div>
                    </header>

                    <div className="app-body">
                        <Find-docs />
                        {!this.state.scannerVisible && (
                            <button
                                className="cam-btn"
                                onClick={this.showScanner}
                            >
                                <FontAwesomeIcon icon={faCamera} />
                            </button>
                        )}

                        {this.state.scannerVisible && (
                            <Scanner showScanner={this.showScanner} />
                        )}
                        <Route path={"/home"} render={() => <Home />} />
                    </div>
                    <footer>
                        <div className="footer-btn">
                            <span>home</span>
                        </div>
                        <div className="footer-btn">
                            <span>home</span>
                        </div>

                        <div className="footer-btn" onClick={this.hideScanner}>
                            <span>back</span>
                        </div>

                        <ProfileMenu />
                    </footer>
                </div>
            </BrowserRouter>
        );
    }
}
