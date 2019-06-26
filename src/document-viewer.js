import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { TesseractWorker } from "tesseract.js";
const worker = new TesseractWorker();

export class DocumentViewer extends React.Component {
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
                console.log("state.text", this.state.text == result.text);
            });
    }
    handleChange(event) {
        this.setState({});
    }
    submit() {
        let text = this.state.text;
        axios
            .post("/store-document", {
                text: text
            })
            .then(() => {
                console.log("this.state.text", text);
            });
    }
    render() {
        return (
            <div className="page-container">
                <div className="x-btn" onClick={this.props.hideUploader}>
                    X
                </div>
                <div className="demo-img">
                    <img src="./img/demo.jpg" />
                </div>
                <div className="display-text">
                    <p>{this.state.text}</p>
                </div>
                <button
                    className="save-btn"
                    onClick={e => {
                        this.submit();
                    }}
                >
                    Save doc
                </button>
            </div>
        );
    }
}
