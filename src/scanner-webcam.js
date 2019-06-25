import React, { Component } from "react";
import { Photo } from "./photo";
import { Camera } from "./camera";

export class CameraFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            constraints: {
                audio: false,
                video: {
                    width: 1280,
                    height: 720,
                    facingMode: "user"
                }
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
    }

    render() {
        return (
            <div className="camera-container">
                <Camera handleStartClick={this.handleStartClick} />
                <canvas id="canvas" hidden />
                <Photo />
            </div>
        );
    }
}
