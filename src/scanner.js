import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { TesseractWorker } from "tesseract.js";
const worker = new TesseractWorker();

export class Scanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        const myImage = "./img/demo.jpg";
        worker
            .recognize(myImage)
            .progress(progress => {
                console.log("progress", progress);
            })
            .then(result => {
                console.log("result", result);
                this.setState({
                    text: result.text
                });
            });
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
                <div className="demo-img">
                    <img src="./img/demo.jpg" />
                </div>
                <div className="display-text">{this.state.text}</div>
            </div>
        );
    }
}
