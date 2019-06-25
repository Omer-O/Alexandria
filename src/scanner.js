import React, { Component } from "react";
import { CapturedImage } from "./captured-image";
import { Camera } from "./camera";
import axios from "./axios";

export class Scanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            constraints: {
                audio: false,
                video: { width: 1000, height: 1200 }
            }
        };
        this.handleStartClick = this.handleStartClick.bind(this);
        this.takePicture = this.takePicture.bind(this);
    }
    componentDidMount() {
        const canvas = document.querySelector("canvas");
        const photo = document.getElementById("photo");
        const context = canvas.getContext("2d");
        const { width, height } = this.state.constraints.video;
        context.fillRect(0, 0, width, height);

        const data = canvas.toDataURL("image/jpeg");
        photo.setAttribute("src", data);
    }
    handleStartClick(e) {
        e.preventDefault();
        this.takePicture();
    }

    takePicture() {
        const canvas = document.querySelector("canvas");
        const context = canvas.getContext("2d");
        const video = document.querySelector("video");
        const photo = document.getElementById("photo");
        const { width, height } = this.state.constraints.video;

        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);

        const data = canvas.toDataURL("image/jpeg");
        console.log("this is data of takePicture:", data);
        const formData = new FormData();
        formData.append("src", data);
        axios
            .post("/store-document", formData)
            .then(result => {
                console.log("result of SCANNER:", result);
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    error: true
                });
            });
    }

    render() {
        return (
            <div className="scanner-container">
                <canvas id="canvas" hidden />
                <CapturedImage />
                <Camera handleStartClick={this.handleStartClick} />
            </div>
        );
    }
}
