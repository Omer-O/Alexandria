import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export class Scanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null
        };
    }
    handleChange(event) {
        this.setState({});
    }
    submit(e) {}
    render() {
        return (
            <div className="page-containe">
                <div className="x-btn" onClick={this.props.hideUploader}>
                    X
                </div>
                <div className="camera-display">
                    ..............................
                    ..............................
                    ..............................
                </div>
            </div>
        );
    }
}
