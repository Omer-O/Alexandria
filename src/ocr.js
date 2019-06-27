import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { TesseractWorker } from "tesseract.js";
const worker = new TesseractWorker();

export class Ocr extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log("ocr did mount");
        console.log("this.props.showText()", this.props.showText);
    }
    convertUrl() {
        console.log("trying to convrt");
        console.log("this.props.img_url ", this.props.img_url);

        const img = new Image();

        img.src = " ";
        this.readDocument(img);
    }
    readDocument(img) {
        worker
            .recognize(this.props.img_url)
            .progress(progress => {
                console.log("progress", progress);
            })
            .then(result => {
                console.log("result", result);
                this.setState({
                    text: result.text
                });
                console.log("state.text", this.state.text == result.text);
                this.submit();
            });
    }
    submit() {
        let text = this.state.text;
        console.log("doc id :", this.props.docId);

        axios
            .post("/update-text", {
                docId: this.props.docId,
                text: text
            })
            .then(result => {
                console.log("this.state.text:", result);
                this.props.showText();
            });
    }
    render() {
        return (
            <div
                className="nav-btn"
                onClick={e => {
                    this.convertUrl();
                }}
            >
                OCR
            </div>
        );
    }
}
