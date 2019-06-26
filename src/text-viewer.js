import React from "react";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
                        icon={faUndo}
                        className="nav-btn"
                        onClick={this.props.hide}
                    />

                    <div className="nav-btn">fjlksdf</div>
                </header>
                <div className="mid-section">
                    <div className="text-viewer">
                        <p>{this.props.txt}</p>
                    </div>
                </div>
                <footer>
                    <FontAwesomeIcon
                        icon={faUndo}
                        className="nav-btn"
                        onClick={this.props.hide}
                    />

                    <div className="nav-btn">fjlksdf</div>
                </footer>
            </div>
        );
    }
}
