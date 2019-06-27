import React from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Speak } from "./speak";

export class TextViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {}

    render() {
        return (
            <div className="wrapper">
                <header>
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="nav-btn"
                        onClick={this.props.hide}
                    />
                </header>
                <div className="mid-section">
                    <div className="text-viewer">
                        <p>{this.props.txt}</p>
                    </div>
                    <Speak txt={this.props.txt} />
                </div>
                <footer />
            </div>
        );
    }
}
