import React, { Component } from "react";
import { CapturedImage } from "./captured-image";
import { Camera } from "./camera";

export class Scanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cameraVisible: true,
            constraints: {
                audio: false,
                video: { width: 1000, height: 1200 }
            }
        };
        this.handleStartClick = this.handleStartClick.bind(this);
        this.takePicture = this.takePicture.bind(this);

        this.hideCamera = this.hideCamera.bind(this);
        this.showCamera = this.showCamera.bind(this);
        // this.uploadImage = this.uploadImage.bind(this);
    }

    showCamera() {
        this.setState({
            cameraVisible: true
        });
        this.state.cameraVisible;
        console.log("Camera visible", this.state.cameraVisible);
    }
    hideCamera() {
        this.setState({
            cameraVisible: false
        });
        console.log("Camera visible", this.state.cameraVisible);
    }
    componentDidMount() {
        const canvas = document.querySelector("canvas");
        const photo = document.getElementById("photo");
        const context = canvas.getContext("2d");
        const { width, height } = this.state.constraints.video;
        context.fillRect(0, 0, width, height);

        const data = canvas.toDataURL("image/png");
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

        const data = canvas.toDataURL("image/png");

        console.log("this is data of takePicture:", data);
        photo.setAttribute("src", data);
        this.hideCamera();
    }

    render() {
        return (
            <div className="scanner-container">
                <canvas id="canvas" hidden />
                <CapturedImage cameraVisible={this.state.cameraVisible} />
                {this.state.cameraVisible && (
                    <div>
                        <Camera handleStartClick={this.handleStartClick} />
                    </div>
                )}
            </div>
        );
    }
}
